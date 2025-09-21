import { z } from 'zod';

// 범용 검색 스키마 (refinement 없는 기본 필드만)
export const baseSearchSchema = z.object({
  strtRow: z.number()
    .int('시작행은 정수여야 합니다.')
    .min(0, '시작행은 0 이상이어야 합니다.')
    .optional(),
  endRow: z.number()
    .int('끝행은 정수여야 합니다.')
    .min(1, '끝행은 1 이상이어야 합니다.')
    .optional(),
  srchType: z.enum([], {
    error: '올바른 검색 타입을 선택해주세요.',
  }).optional(),
  srchKywd: z.string()
    .max(100, '검색 키워드는 100자 이하여야 합니다.')
    .optional(),
});

// 페이지네이션 검증 함수 (재사용용)
export const addPaginationValidation = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
  return schema.refine((data: BaseSearchType) => {
    // 페이지네이션 관련 유효성 검사 (둘 다 있을 때만)
    if (data.strtRow !== undefined && data.endRow !== undefined) {
      return data.endRow > data.strtRow;
    }
    return true;
  }, {
    error: '끝행은 시작행보다 커야 합니다.',
    path: [ 'endRow', ],
  });
};

// 타입 추출
export type BaseSearchType = z.infer<typeof baseSearchSchema>;
