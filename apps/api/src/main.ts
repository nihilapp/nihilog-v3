import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ZodValidationPipe } from 'nestjs-zod';

import { UnifiedResponseInterceptor } from '@/interceptors/unified-response.interceptor';
import { generateOpenApiDocument } from '@/openapi/generator';

import { AppModule } from './app.module';
import { CONFIG } from './config/config';
import { HttpLoggingInterceptor } from './http-logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: [
        'log',
        'error',
        'warn',
        'debug',
        'verbose',
      ], // 모든 로그 레벨 활성화
    }
  );

  // Fastify 플러그인 등록
  // NestJS Fastify 어댑터와 플러그인 간의 알려진 타입 호환성 문제로 인한 ESLint 비활성화
  /* eslint-disable @typescript-eslint/no-unsafe-argument */

  // Cookie 플러그인을 먼저 등록 (CORS가 Cookie 메서드를 사용하므로)
  await app.register(fastifyCookie as any);

  await app.register(
    fastifyCors as any,
    {
      origin: (origin: string | undefined, cb: (err: Error | null, allow: boolean) => void) => {
      // 모든 origin 허용 (개발 환경)
        if (process.env.NODE_ENV === 'development') {
          cb(
            null,
            true
          );
          return;
        }
        // 프로덕션 환경에서는 허용된 origin만
        const allowedOrigins = [ 'https://nihilncunia.dev', ];
        if (!origin || allowedOrigins.includes(origin)) {
          cb(
            null,
            true
          );
        }
        else {
          cb(
            new Error('Not allowed by CORS'),
            false
          );
        }
      },
      credentials: true,
      methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH',
        'OPTIONS',
      ],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Cookie',
      ],
      exposedHeaders: [ 'Set-Cookie', ],
    }
  );

  /* eslint-enable @typescript-eslint/no-unsafe-argument */

  // 글로벌 파이프 설정
  app.useGlobalPipes(new ZodValidationPipe());

  // 글로벌 인터셉터 설정
  app.useGlobalInterceptors(
    new HttpLoggingInterceptor(),
    new UnifiedResponseInterceptor()
  );

  // 글로벌 필터 설정
  app.useGlobalFilters();

  const host = CONFIG.SERVER.HOST;
  const port = CONFIG.SERVER.PORT;

  // Zod 기반 OpenAPI 문서 생성 (필요시 사용)
  generateOpenApiDocument();

  await app.listen(
    port,
    host
  );

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 애플리케이션이 http://${host}:${port} 에서 실행 중입니다.`);
  logger.log(`📚 OpenAPI 문서가 생성되었습니다.`);
}

const handleError = (error: Error): void => {
  new Logger('Bootstrap').error(
    '❌ 애플리케이션 시작에 실패했습니다:',
    error.stack
  );
  process.exit(1);
};

bootstrap().catch(handleError);
