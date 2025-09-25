import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

import { UnifiedResponseInterceptor } from '@/interceptors/unified-response.interceptor';

import { AppModule } from './app.module';
import { HttpLoggingInterceptor } from './http-logging.interceptor';
import { createSwaggerConfig, swaggerUiOptions } from './swagger.config';

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
    origin: true,
    credentials: true,
    methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', ],
    allowedHeaders: [ 'Content-Type', 'Authorization', 'X-Requested-With', ],
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

  // Swagger 설정 (config.yaml의 swagger.* 적용)
  const swaggerTitle = configService.get<string>('swagger.docsName') ?? 'API 문서';
  const swaggerDesc = configService.get<string>('swagger.docsDescription') ?? '';
  const swaggerVersion = configService.get<string>('swagger.docsVersion') ?? '1.0.0';
  const swaggerPath = configService.get<string>('swagger.path') ?? 'api';

  const host = configService.get<string>('server.host') ?? 'localhost';
  const port = configService.get<number>('server.port') ?? 8000;

  const document = SwaggerModule.createDocument(
    app,
    createSwaggerConfig({
      title: swaggerTitle,
      description: [
        swaggerDesc,
        '',
        '🔐 자동 인증 기능: 로그인 후 자동으로 JWT 토큰이 설정되어 별도의 인증 설정이 필요하지 않습니다.',
        '',
        '📌 사용 방법:',
        '1. /auth/signin 엔드포인트로 로그인하세요',
        '2. 로그인 성공 시 자동으로 쿠키에 토큰이 설정됩니다',
        '3. 이후 모든 API 요청에서 자동으로 인증됩니다',
        '',
        '💡 Swagger UI에서는 쿠키가 자동으로 포함되어 인증된 요청을 테스트할 수 있습니다.',
        '',
        '🔧 모든 Swagger 요청은 서버 로그에 🔧 표시로 구분됩니다.',
      ].join('\n'),
      version: swaggerVersion,
    })
  );

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
