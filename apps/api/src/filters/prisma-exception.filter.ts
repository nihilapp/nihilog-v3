import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@nihilog/db';
import type { FastifyReply } from 'fastify';

import { RESPONSE_CODE } from '@/code/response.code';
import { createError } from '@/utils/createError';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    // Prisma 에러인 경우 상세 매핑
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const code = exception.code;

      // 기본값
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let responseCode: keyof typeof RESPONSE_CODE = 'INTERNAL_SERVER_ERROR';
      const message = exception.message;

      // 대표 케이스 매핑
      switch (code) {
      case 'P2002': // Unique constraint failed
        status = HttpStatus.CONFLICT;
        responseCode = 'CONFLICT';
        break;
      case 'P2003': // Foreign key constraint failed
      case 'P2004':
      case 'P2005':
      case 'P2006':
      case 'P2007':
      case 'P2009':
      case 'P2010':
      case 'P2011':
      case 'P2012':
      case 'P2013':
      case 'P2014':
      case 'P2015':
      case 'P2016':
        status = HttpStatus.BAD_REQUEST;
        responseCode = 'BAD_REQUEST';
        break;
      case 'P2001': // Record not found
        status = HttpStatus.NOT_FOUND;
        responseCode = 'NOT_FOUND';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        responseCode = 'INTERNAL_SERVER_ERROR';
      }

      // 안전 로그 (코드/메타만)
      const meta = 'meta' in exception
        ? exception.meta
        : {};
      this.logger.error(`[Prisma] code=${code} meta=${JSON.stringify(meta || {})}`);

      return reply
        .status(status)
        .send(createError(
          responseCode,
          message
        ));
    }

    // 그 외 예외는 다음 필터/기본 처리로 위임하기 위해 rethrow
    throw exception;
  }
}
