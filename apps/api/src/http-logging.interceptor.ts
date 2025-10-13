import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException
} from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  // ANSI 색상 코드
  private readonly colors = {
    reset: '\x1b[0m',
    // 기본 색상
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    // 밝은 색상
    brightBlack: '\x1b[90m',
    brightRed: '\x1b[91m',
    brightGreen: '\x1b[92m',
    brightYellow: '\x1b[93m',
    brightBlue: '\x1b[94m',
    brightMagenta: '\x1b[95m',
    brightCyan: '\x1b[96m',
    brightWhite: '\x1b[97m',
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const response = context.switchToHttp().getResponse<FastifyReply>();

    const { method, url, ip, } = request;
    const body = request.body as Record<string, any> | undefined;
    const query = request.query as Record<string, any>;
    const params = request.params as Record<string, any>;
    const headers = request.headers;

    // 컨트롤러와 핸들러 정보 추출
    const controllerClass = context.getClass();
    const handlerMethod = context.getHandler();
    const controllerName = controllerClass.name;
    const methodName = handlerMethod.name;
    const handlerInfo = `${controllerName}.${methodName}()`;

    const userAgent = headers['user-agent'] || '';
    const contentType = headers['content-type'] || '';
    const origin = headers['origin'] || '';
    const referer = headers['referer'] || '';

    // Swagger 요청인지 확인
    const isSwaggerRequest = userAgent.includes('Swagger')
      || referer.includes('/api')
      || origin.includes('swagger')
      || headers['x-swagger-login'] === 'true'
      || headers['x-swagger-request'] === 'true'
      || headers['x-request-source'] === 'swagger-ui';

    const startTime = Date.now();

    // 요청 로깅 - 녹색
    const requestLog = `${this.colors.green}📨 요청 [${method}] ${url} → ${handlerInfo} - IP: ${ip}${isSwaggerRequest
      ? ' 🔧 Swagger'
      : ''}`
      + (Object.keys(query).length > 0
        ? ` | Query: ${JSON.stringify(query)}`
        : '')
      + (Object.keys(params).length > 0
        ? ` | Params: ${JSON.stringify(params)}`
        : '')
      + (method !== 'GET' && body && typeof body === 'object' && Object.keys(body).length > 0
        ? ` | Body: ${JSON.stringify(body)}`
        : '')
      + (contentType
        ? ` | Content-Type: ${contentType}`
        : '')
      + (userAgent
        ? ` | User-Agent: ${userAgent.substring(0, 100)}${userAgent.length > 100
          ? '...'
          : ''}`
        : '')
      + (origin
        ? ` | Origin: ${origin}`
        : '')
      + this.colors.reset;

    this.logger.log(requestLog);

    return next.handle().pipe(tap({
      next: (responseData) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        const statusCode = response.statusCode;

        // 응답 로깅 - 시안색
        const responseLog = `${this.colors.cyan}📤 응답 [${method}] [${statusCode}] ${url} → ${handlerInfo} - Duration: ${duration}ms${isSwaggerRequest
          ? ' 🔧 Swagger'
          : ''}`
          + (responseData && typeof responseData === 'object'
            ? ` | Response: ${JSON.stringify(responseData).substring(0, 500)}${JSON.stringify(responseData).length > 500
              ? '...'
              : ''}`
            : ''
          )
          + this.colors.reset;

        this.logger.log(responseLog);
      },
      error: (error: unknown) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        let status = 500;
        let message = '알 수 없는 오류';

        if (error instanceof HttpException) {
          status = error.getStatus();
        }
        else if (error && typeof error === 'object' && 'status' in error) {
          status = (error as { status: number }).status;
        }

        if (error instanceof Error) {
          message = error.message;
        }
        else if (error && typeof error === 'object' && 'message' in error) {
          message = (error as { message: string }).message;
        }

        // 에러 로깅 - 빨간색
        const errorLog = `${this.colors.red}❌ 에러 [${method}] [${status}] ${url} → ${handlerInfo} - Duration: ${duration}ms | Error: ${message}${isSwaggerRequest
          ? ' 🔧 Swagger'
          : ''}`
          + this.colors.reset;

        this.logger.error(errorLog);
      },
    }));
  }
}
