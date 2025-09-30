import { z } from 'zod';

// 범용 검색 스키마 (기본 필드만)
export const baseSearchSchema = z.object({
  strtRow: z.number()
    .int('시작행은 정수여야 합니다.')
    .min(0, '시작행은 0 이상이어야 합니다.')
    .optional(),
  endRow: z.number()
    .int('끝행은 정수여야 합니다.')
    .min(1, '끝행은 1 이상이어야 합니다.')
    .optional(),
  srchType: z.string()
    .optional(),
  srchKywd: z.string()
    .max(100, '검색 키워드는 100자 이하여야 합니다.')
    .optional(),
  page: z.number()
    .int('페이지는 정수여야 합니다.')
    .min(1, '페이지는 1 이상이어야 합니다.')
    .optional(),
});

// 타입 추출
export type BaseSearchType = z.infer<typeof baseSearchSchema>;
