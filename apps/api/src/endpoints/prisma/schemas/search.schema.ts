import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

// 범용 검색 스키마 (기본 필드만)
export const baseSearchSchema = z.object({
  strtRow: z.number()
    .int('시작행은 정수여야 합니다.')
    .min(
      0,
      '시작행은 0 이상이어야 합니다.'
    )
    .optional()
    .openapi({
      description: '시작 행 번호 (페이징용, 0부터 시작)',
      example: 0,
    }),
  endRow: z.number()
    .int('끝행은 정수여야 합니다.')
    .min(
      1,
      '끝행은 1 이상이어야 합니다.'
    )
    .optional()
    .openapi({
      description: '끝 행 번호 (페이징용)',
      example: 10,
    }),
  srchType: z.string()
    .optional()
    .openapi({
      description: '검색 타입 (각 엔티티별로 정의됨)',
      example: 'pstTtl',
    }),
  srchKywd: z.string()
    .max(
      100,
      '검색 키워드는 100자 이하여야 합니다.'
    )
    .optional()
    .openapi({
      description: '검색 키워드 (최대 100자)',
      example: '검색어',
    }),
  page: z.number()
    .int('페이지는 정수여야 합니다.')
    .min(
      1,
      '페이지는 1 이상이어야 합니다.'
    )
    .optional()
    .openapi({
      description: '페이지 번호 (1부터 시작)',
      example: 1,
    }),
});

// 타입 추출
export type BaseSearchType = z.infer<typeof baseSearchSchema>;
