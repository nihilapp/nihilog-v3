import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex } from './common.schema';
import { baseSearchSchema } from './search.schema';

export const categoryInfoSchema = commonSchema.extend({
  ctgryNo: z.coerce
    .number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional(),
  ctgryNm: z.string()
    .min(
      1,
      '카테고리명은 필수입니다.'
    )
    .max(
      100,
      '카테고리명은 100자를 초과할 수 없습니다.'
    ),
  ctgryExpln: z.string()
    .max(
      200,
      '카테고리 설명은 200자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional(),
  ctgryColr: z.string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      '색상은 #RRGGBB 형식이어야 합니다.'
    )
    .nullable()
    .optional(),
  ctgryStp: z.coerce
    .number()
    .int('카테고리 정렬순은 정수여야 합니다.')
    .positive('카테고리 정렬순은 양수여야 합니다.'),
  upCtgryNo: z.coerce
    .number()
    .int('상위 카테고리 번호는 정수여야 합니다.')
    .positive('상위 카테고리 번호는 양수여야 합니다.'),
  rowNo: z.coerce
    .number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional(),
  totalCnt: z.coerce
    .number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional(),
  ctgryNoList: z.array(z.coerce
    .number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.'))
    .optional(),
});

// CtgryInfo 테이블 컬럼만 pick (Prisma 테이블 구조)
export const ctgryInfoTableSchema = categoryInfoSchema.pick({
  ctgryNo: true,
  ctgryNm: true,
  ctgryExpln: true,
  ctgryColr: true,
  ctgryStp: true,
  upCtgryNo: true,
  useYn: true,
  delYn: true,
  crtNo: true,
  crtDt: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  delDt: true,
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
    useYn: true,
    delYn: true,
    ctgryNm: true,
    ctgryColr: true,
    upCtgryNo: true,
  }).shape,
  srchType: z.enum(
    [
      'ctgryNm',
      'ctgryExpln',
    ],
    {
      error: '검색 타입은 ctgryNm, ctgryExpln 중 하나여야 합니다.',
    }
  ).optional(),
  orderBy: z.enum(
    [
      'LATEST',
      'OLDEST',
      'NAME_ASC',
      'NAME_DESC',
      'STP_ASC',
      'STP_DESC',
    ],
    {
      error: '정렬 옵션은 LATEST, OLDEST, NAME_ASC, NAME_DESC, STP_ASC, STP_DESC 중 하나여야 합니다.',
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
}).partial();

export type CategoryInfoType = z.infer<typeof categoryInfoSchema>;
export type CtgryInfoTableType = z.infer<typeof ctgryInfoTableSchema>;
export type CreateCategoryType = z.infer<typeof createCategorySchema>;
export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;
export type DeleteCategoryType = z.infer<typeof deleteCategorySchema>;
export type SearchCategoryType = z.infer<typeof searchCategorySchema>;
