import { z } from 'zod';

import { commonSchema } from '@/endpoints/drizzle/schemas/common.schema';
import { addPaginationValidation } from '@/endpoints/drizzle/schemas/search.schema';

export const categorySubscribeSchema = commonSchema.extend({
  ctgrySbcrNo: z.coerce.number()
    .int('구독 카테고리 번호는 정수여야 합니다.')
    .positive('구독 카테고리 번호는 양수여야 합니다.')
    .optional(),
  sbcrNo: z.coerce.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
  ctgryNo: z.coerce.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional(),
  ctgryNm: z.string()
    .max(100, '카테고리 이름은 100자 이하여야 합니다.')
    .optional(),
  rowNo: z.coerce.number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional(),
  totalCnt: z.coerce.number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional(),
  ctgryNoList: z.array(z.coerce.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.'))
    .optional(),
  ctgrySbcrNoList: z.array(z.coerce.number()
    .int('카테고리 구독 번호는 정수여야 합니다.')
    .positive('카테고리 구독 번호는 양수여야 합니다.'))
    .optional(),
});

export const categorySubscribeItemListSchema = categorySubscribeSchema.pick({
  ctgryNo: true,
  ctgryNm: true,
});

// 카테고리 구독 생성용 스키마
export const createCategorySubscribeSchema = categorySubscribeSchema.pick({
  sbcrNo: true,
  ctgryNo: true,
  useYn: true,
  delYn: true,
  ctgryNoList: true,
}).partial({
  ctgryNoList: true,
});

// 카테고리 구독 수정용 스키마
export const updateCategorySubscribeSchema = categorySubscribeSchema.pick({
  ctgrySbcrNo: true,
  sbcrNo: true,
  ctgryNo: true,
  useYn: true,
  delYn: true,
  ctgryNoList: true,
}).partial();

// 카테고리 구독 다건 생성용 스키마
export const multipleCreateCategorySubscribeSchema = categorySubscribeSchema.pick({
  sbcrNo: true,
  ctgryNoList: true,
  useYn: true,
  delYn: true,
});

// 카테고리 구독 다건 수정용 스키마
export const multipleUpdateCategorySubscribeSchema = categorySubscribeSchema.pick({
  ctgrySbcrNoList: true,
  sbcrNo: true,
  ctgryNoList: true,
  useYn: true,
  delYn: true,
}).partial();

// 카테고리 구독 다건 삭제용 스키마
export const multipleDeleteCategorySubscribeSchema = categorySubscribeSchema.pick({
  ctgrySbcrNoList: true,
  sbcrNo: true,
});

// 카테고리 구독 검색용 스키마
export const searchCategorySubscribeSchema = addPaginationValidation(
  categorySubscribeSchema.pick({
    sbcrNo: true,
    ctgryNo: true,
    useYn: true,
    delYn: true,
    ctgrySbcrNoList: true,
  }).partial().extend({
    srchType: z.enum([ 'ctgryNm', ], {
      error: '검색 타입은 ctgryNm 여야 합니다.',
    }).optional(),
  })
);

export type CategorySubscribeType = z.infer<typeof categorySubscribeSchema>;
export type CategorySubscribeInfoType = Partial<CategorySubscribeType>;
export type CategorySubscribeItemListType = z.infer<typeof categorySubscribeItemListSchema>;
export type CreateCategorySubscribeType = z.infer<typeof createCategorySubscribeSchema>;
export type UpdateCategorySubscribeType = z.infer<typeof updateCategorySubscribeSchema>;
export type MultipleCreateCategorySubscribeType = z.infer<typeof multipleCreateCategorySubscribeSchema>;
export type MultipleUpdateCategorySubscribeType = z.infer<typeof multipleUpdateCategorySubscribeSchema>;
export type MultipleDeleteCategorySubscribeType = z.infer<typeof multipleDeleteCategorySubscribeSchema>;
export type SearchCategorySubscribeType = z.infer<typeof searchCategorySubscribeSchema>;
