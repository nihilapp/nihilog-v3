import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { ynSchema } from './enums.schema';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

export const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
export const dateTimeMessage = 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.';

/**
 * @description Y/N enum 스키마 (에러 메시지 추가)
 */
export const ynEnumSchema = ynSchema.refine(
  (val) => val === 'Y' || val === 'N',
  {
    message: 'Y 또는 N 값을 입력해주세요.',
  }
);

/**
 * @description 공통 스키마 (사용 여부, 삭제 여부, 생성/수정/삭제 정보 포함)
 */
export const commonSchema = z.object({
  useYn: ynEnumSchema
    .default('Y')
    .openapi({
      description: '사용 여부',
      example: 'Y',
    }),
  delYn: ynEnumSchema
    .default('N')
    .openapi({
      description: '삭제 여부',
      example: 'N',
    }),
  crtNo: z.coerce.number()
    .int('생성자 번호는 정수여야 합니다.')
    .nullable()
    .optional()
    .openapi({
      description: '생성자 번호',
      example: 1,
    }),
  crtDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .nullable()
    .optional()
    .openapi({
      description: '생성 날짜 (ISO 8601 UTC 형식)',
      example: '2024-01-01T00:00:00.000Z',
    }),
  updtNo: z.coerce.number()
    .int('수정자 번호는 정수여야 합니다.')
    .nullable()
    .optional()
    .openapi({
      description: '수정자 번호',
      example: 1,
    }),
  updtDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .nullable()
    .optional()
    .openapi({
      description: '수정 날짜 (ISO 8601 UTC 형식)',
      example: '2024-01-01T00:00:00.000Z',
    }),
  delNo: z.coerce.number()
    .int('삭제자 번호는 정수여야 합니다.')
    .nullable()
    .optional()
    .openapi({
      description: '삭제자 번호',
      example: 1,
    }),
  delDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .nullable()
    .optional()
    .openapi({
      description: '삭제 날짜 (ISO 8601 UTC 형식)',
      example: '2024-01-01T00:00:00.000Z',
    }),
});

/**
 * @description 포스트 조회수 통계 스키마
 */
export const analyzeStatSchema = z.object({
  mode: z.enum([
    'day',
    'week',
    'month',
    'year',
  ])
    .default('day')
    .openapi({
      description: '모드 (day: 일간, week: 주간, month: 월간, year: 연간)',
      example: 'day',
    }),
  startDt: z.string()
    .openapi({
      description: '시작 날짜',
      example: '2024-01-01',
    }),
  endDt: z.string()
    .openapi({
      description: '종료 날짜',
      example: '2024-01-01',
    }),
  limit: z.coerce.number()
    .int('제한 수는 정수여야 합니다.')
    .min(
      1,
      '제한 수는 1 이상이어야 합니다.'
    )
    .max(
      1000,
      '제한 수는 1000 이하여야 합니다.'
    )
    .optional()
    .openapi({
      description: '결과 제한 수 (TOP N)',
      example: 10,
    }),
});

// 타입 정의

/**
 * @description Y/N enum 타입
 */
export type YnType = z.infer<typeof ynEnumSchema>;

/**
 * @description 포스트 조회수 통계 타입
 */
export type AnalyzeStatType = z.infer<typeof analyzeStatSchema>;
