import { schemas } from '@/endpoints/drizzle/schemas';
import { Global, Module, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { MESSAGE_CODE } from '@/code/message.code';

export const DRIZZLE = Symbol('drizzle_connection');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('DrizzleModule');
        const formatError = (e: unknown): string => {
          try {
            if (e instanceof Error) {
              return e.stack ?? e.message;
            }
            if (typeof e === 'string') {
              return e;
            }
            return JSON.stringify(e, null, 2);
          }
          catch {
            return '알 수 없는 오류';
          }
        };
        try {
          const pool = new Pool({
            connectionString: configService.get('database.url'),
            options: '-c search_path=nihilog,public',
          });

          // 연결 후 스키마 설정
          pool.on('connect', (client) => {
            logger.log(MESSAGE_CODE.DB_CONNECTED);
            client.query('SET search_path TO nihilog, public')
              .then(() => {
                logger.log(MESSAGE_CODE.DB_SEARCH_PATH_SET);
              })
              .catch((err: unknown) => {
                logger.error(MESSAGE_CODE.DB_SEARCH_PATH_SET_FAILED, formatError(err));
              });
          });

          // 풀 에러 핸들링
          pool.on('error', (err: unknown) => {
            logger.error(MESSAGE_CODE.DB_CONNECTION_ERROR, formatError(err));
          });

          return drizzle(pool, {
            schema: {
              // schemas에 정의된 스키마 모음을 임포트.
              ...schemas,
            },
            logger: true, // 쿼리 로깅 활성화로 스키마 확인
          });
        }
        catch (error: unknown) {
          logger.error(MESSAGE_CODE.DRIZZLE_INIT_ERROR, formatError(error));
          throw error;
        }
      },
      inject: [ ConfigService, ],
    },
  ],
  exports: [ DRIZZLE, ],
})
export class DrizzleModule {}
