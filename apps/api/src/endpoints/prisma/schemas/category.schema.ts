import { z } from 'zod';

import { commonSchema } from '@/endpoints/prisma/schemas/common.schema';
import { baseSearchSchema } from '@/endpoints/prisma/schemas/search.schema';

const categoryInfoSchema = commonSchema.extend({
  ctgryNo: z.coerce
    .number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '카테고리 번호',
      example: 1,
    }),
  ctgryNm: z.string()
    .min(1, '카테고리명은 필수입니다.')
    .max(100, '카테고리명은 100자를 초과할 수 없습니다.')
    .openapi({
      description: '카테고리명 (1-100자)',
      example: 'JavaScript',
    }),
  ctgryExpln: z.string()
    .max(200, '카테고리 설명은 200자를 초과할 수 없습니다.')
    .nullable()
    .optional()
    .openapi({
      description: '카테고리 설명 (최대 200자)',
      example: 'JavaScript 프로그래밍 언어',
    }),
  ctgryColr: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, '색상은 #RRGGBB 형식이어야 합니다.')
    .nullable()
    .optional()
    .openapi({
      description: '카테고리 색상 (#RRGGBB 형식)',
      example: '#FF5733',
    }),
  ctgryStp: z.coerce
    .number()
    .int('카테고리 정렬순은 정수여야 합니다.')
    .positive('카테고리 정렬순은 양수여야 합니다.')
    .openapi({
      description: '카테고리 정렬순',
      example: 1,
    }),
  upCtgryNo: z.coerce
    .number()
    .int('상위 카테고리 번호는 정수여야 합니다.')
    .positive('상위 카테고리 번호는 양수여야 합니다.')
    .openapi({
      description: '상위 카테고리 번호',
      example: 1,
    }),
  rowNo: z.coerce
    .number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '행 번호',
      example: 1,
    }),
  totalCnt: z.coerce
    .number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '총 개수',
      example: 10,
    }),
  ctgryNoList: z.array(z.coerce
    .number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '카테고리 번호 목록',
      example: [ 1, 2, 3, ],
    }),
});

export const createCategorySchema = categoryInfoSchema.pick({
  ctgryNm: true,
  ctgryExpln: true,
  ctgryColr: true,
  ctgryStp: true,
  upCtgryNo: true,
  useYn: true,
  delYn: true,
})
  .partial()
  .required({
    ctgryNm: true,
    ctgryStp: true,
    upCtgryNo: true,
  });

export const updateCategorySchema = categoryInfoSchema.omit({
  rowNo: true,
  totalCnt: true,
  ctgryNoList: true,
}).partial();

export const deleteCategorySchema = categoryInfoSchema.pick({
  ctgryNo: true,
  ctgryNoList: true,
});

export const searchCategorySchema = baseSearchSchema.partial().extend({
  ...categoryInfoSchema.pick({
    delYn: true,
    ctgryNm: true,
  }).shape,
  srchType: z.enum([ 'ctgryNm', ], {
    error: '검색 타입은 ctgryNm 입니다.',
  }).optional().openapi({
    description: '검색 타입',
    example: 'ctgryNm',
  }),
}).partial();

export type CreateCategoryType = z.infer<typeof createCategorySchema>;
export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;
export type DeleteCategoryType = z.infer<typeof deleteCategorySchema>;
export type SearchCategoryType = z.infer<typeof searchCategorySchema>;
