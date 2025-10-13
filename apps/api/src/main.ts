import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

import { UnifiedResponseInterceptor } from '@/interceptors/unified-response.interceptor';
import { generateOpenApiDocument } from '@/openapi/generator';

import { AppModule } from './app.module';
import { HttpLoggingInterceptor } from './http-logging.interceptor';
import { swaggerUiOptions } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: [ 'log', 'error', 'warn', 'debug', 'verbose', ], // 모든 로그 레벨 활성화
    }
  );

  const configService = app.get(ConfigService);

  // Fastify 플러그인 등록
  // NestJS Fastify 어댑터와 플러그인 간의 알려진 타입 호환성 문제
  // @ts-expect-error - NestJS Fastify 어댑터와 플러그인 타입 호환성 문제
  await app.register(fastifyCors, {
    origin: (origin, cb) => {
      // 모든 origin 허용 (개발 환경)
      if (process.env.NODE_ENV === 'development') {
        cb(null, true);
        return;
      }
      // 프로덕션 환경에서는 허용된 origin만
      const allowedOrigins = [ 'https://nihilncunia.dev', ];
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      }
      else {
        cb(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
    methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', ],
    allowedHeaders: [ 'Content-Type', 'Authorization', 'X-Requested-With', 'Cookie', ],
    exposedHeaders: [ 'Set-Cookie', ],
  });

  // @ts-expect-error - NestJS Fastify 어댑터와 플러그인 타입 호환성 문제
  await app.register(fastifyCookie);

  // 글로벌 파이프 설정
  app.useGlobalPipes(new ZodValidationPipe());

  // 글로벌 인터셉터 설정
  app.useGlobalInterceptors(
    new HttpLoggingInterceptor(),
    new UnifiedResponseInterceptor()
  );

  // 글로벌 필터 설정
  app.useGlobalFilters();

  const swaggerPath = configService.get<string>('swagger.path') ?? 'api';

  const host = configService.get<string>('server.host') ?? 'localhost';
  const port = configService.get<number>('server.port') ?? 8000;

  // Zod 기반 OpenAPI 문서 생성
  const zodOpenApiDocument = generateOpenApiDocument();

  // Zod OpenAPI 문서만 사용
  const document = zodOpenApiDocument;

  SwaggerModule.setup(
    swaggerPath,
    app,
    document,
    swaggerUiOptions
  );

  await app.listen(
    port,
    host
  );

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 애플리케이션이 http://${host}:${port} 에서 실행 중입니다.`);
  logger.log(`📚 Swagger 문서는 http://${host}:${port}/${swaggerPath} 에서 확인 가능합니다.`);
  logger.log(`🔧 Swagger 요청은 로그에 🔧 표시로 구분됩니다.`);
}

const handleError = (error: Error): void => {
  new Logger('Bootstrap').error('❌ 애플리케이션 시작에 실패했습니다:', error.stack);
  process.exit(1);
};

bootstrap().catch(handleError);
