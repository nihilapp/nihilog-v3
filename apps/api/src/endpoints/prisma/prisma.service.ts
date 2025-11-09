import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@nihilog/db';

import { MESSAGE } from '@/code/messages';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });

    // 쿼리 로깅 (개발 시 유용)
    this.$on(
      'query',
      (e) => {
      // params 에 민감정보가 포함될 수 있으므로 프로덕션에서는 쿼리/시간만 남깁니다.
        const isProd = process.env.NODE_ENV === 'production';
        if (isProd) {
          this.logger.debug(`Query: ${e.query} | Duration: ${e.duration}ms`);
        }
        else {
          this.logger.debug(`Query: ${e.query} | Params: ${e.params} | Duration: ${e.duration}ms`);
        }
      }
    );

    // 경고/에러 로깅
    this.$on(
      'warn',
      (e) => {
        this.logger.warn(`[Prisma Warn] ${e.message}`);
      }
    );
    this.$on(
      'error',
      (e) => {
        this.logger.error(`[Prisma Error] ${e.message}`);
      }
    );
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log(MESSAGE.DB.CONNECTED);
    }
    catch (error) {
      this.logger.error(
        '데이터베이스 연결 실패:',
        error
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log(MESSAGE.DB.DISCONNECTED);
    }
    catch (error) {
      this.logger.error(
        '데이터베이스 연결 해제 실패:',
        error
      );
    }
  }
}
