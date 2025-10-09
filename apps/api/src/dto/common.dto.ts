import type { FastifyRequest } from 'fastify';
import { createZodDto } from 'nestjs-zod';

import { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import { analyzeStatSchema } from '@/endpoints/prisma/schemas/common.schema';

import { ResponseDto } from './response.dto';

/**
 * 에러 응답이 포함된 인증된 요청 타입
 * 에러 처리가 필요한 엔드포인트에서 사용
 */
export type AuthRequest = FastifyRequest & {
  user: JwtPayload | null;
  errorResponse?: ResponseDto<null>;
};

// 통계 분석 DTO
export class AnalyzeStatDto extends createZodDto(analyzeStatSchema) {}
