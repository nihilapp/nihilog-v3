import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex } from './common.schema';
import { baseSearchSchema } from './search.schema';

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
    .max(
      100,
      '카테고리 이름은 100자 이하여야 합니다.'
    )
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

// CtgrySbcrMpng 테이블 컬럼만 pick (Prisma 테이블 구조)
export const ctgrySbcrMpngTableSchema = categorySubscribeSchema.pick({
  ctgrySbcrNo: true,
  sbcrNo: true,
  ctgryNo: true,
  useYn: true,
  delYn: true,
  crtNo: true,
  crtDt: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  delDt: true,
});

export const categorySubscribeItemListSchema = categorySubscribeSchema.pick({
  ctgryNo: true,
  ctgryNm: true,
});

// 카테고리 구독 생성용 스키마
export const createCategorySubscribeSchema = categorySubscribeSchema.pick({
  sbcrNo: true,
  ctgryNo: true,
  ctgryNoList: true,
}).partial({
  ctgryNo: true,
});

// 카테고리 구독 수정용 스키마
export const updateCategorySubscribeSchema = categorySubscribeSchema.pick({
  sbcrNo: true,
  ctgryNo: true,
  useYn: true,
  delYn: true,
  ctgryNoList: true,
  ctgrySbcrNoList: true,
}).partial();

// 카테고리 구독 삭제용 스키마
export const deleteCategorySubscribeSchema = categorySubscribeSchema.pick({
  ctgrySbcrNoList: true,
  sbcrNo: true,
}).partial();

// 카테고리 구독 검색용 스키마
export const searchCategorySubscribeSchema = baseSearchSchema.extend({
  ...categorySubscribeSchema.pick({
    delYn: true,
    useYn: true,
    ctgryNo: true,
    sbcrNo: true,
  }).shape,
  srchType: z.enum(
    [
      'ctgryNm',
      'userNm',
      'ctgryExpln',
    ],
    {
      error: '검색 타입은 ctgryNm, userNm, ctgryExpln 중 하나여야 합니다.',
    }
  ).optional(),
  crtDtFrom: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional(),
  crtDtTo: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional(),
  orderBy: z.enum([
    'CTGRY_SBCR_LATEST',
    'CTGRY_SBCR_OLDEST',
    'CTGRY_NAME_ASC',
    'CTGRY_NAME_DESC',
    'USER_NAME_ASC',
    'USER_NAME_DESC',
  ])
    .default('CTGRY_SBCR_LATEST')
    .optional(),
}).partial();

export type CategorySubscribeType = z.infer<typeof categorySubscribeSchema>;
export type CategorySubscribeInfoType = Partial<CategorySubscribeType>;
export type CtgrySbcrMpngTableType = z.infer<typeof ctgrySbcrMpngTableSchema>;
export type CategorySubscribeItemListType = z.infer<typeof categorySubscribeItemListSchema>;
export type CreateCategorySubscribeType = z.infer<typeof createCategorySubscribeSchema>;
export type UpdateCategorySubscribeType = z.infer<typeof updateCategorySubscribeSchema>;
export type DeleteCategorySubscribeType = z.infer<typeof deleteCategorySubscribeSchema>;
export type SearchCategorySubscribeType = z.infer<typeof searchCategorySubscribeSchema>;
