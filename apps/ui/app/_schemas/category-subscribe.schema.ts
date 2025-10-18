import { z } from 'zod';

// 공통 스키마 import
import { ynEnumSchema, baseSearchSchema } from './common.schema';

// 카테고리 구독 요청 스키마들

// 카테고리 구독 생성 스키마
export const createCategorySubscribeSchema = z.object({
  sbcrNo: z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.'),
  ctgryNo: z.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional(),
  ctgryNoList: z.array(z.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.'))
    .optional(),
}).partial({
  ctgryNo: true,
});

// 카테고리 구독 수정 스키마
export const updateCategorySubscribeSchema = z.object({
  ctgrySbcrNo: z.number()
    .int('구독 카테고리 번호는 정수여야 합니다.')
    .positive('구독 카테고리 번호는 양수여야 합니다.')
    .optional(),
  sbcrNo: z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
  ctgryNo: z.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional(),
  useYn: ynEnumSchema.optional(),
  delYn: ynEnumSchema.optional(),
  ctgryNoList: z.array(z.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.'))
    .optional(),
  ctgrySbcrNoList: z.array(z.number()
    .int('카테고리 구독 번호는 정수여야 합니다.')
    .positive('카테고리 구독 번호는 양수여야 합니다.'))
    .optional(),
}).partial();

// 카테고리 구독 삭제 스키마
export const deleteCategorySubscribeSchema = z.object({
  ctgrySbcrNoList: z.array(z.number()
    .int('카테고리 구독 번호는 정수여야 합니다.')
    .positive('카테고리 구독 번호는 양수여야 합니다.'))
    .optional(),
  ctgrySbcrNo: z.number()
    .int('구독 카테고리 번호는 정수여야 합니다.')
    .positive('구독 카테고리 번호는 양수여야 합니다.')
    .optional(),
  sbcrNo: z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
}).partial();

// 카테고리 구독 검색 스키마
export const searchCategorySubscribeSchema = baseSearchSchema.extend({
  delYn: ynEnumSchema.optional(),
  useYn: ynEnumSchema.optional(),
  ctgryNo: z.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional(),
  sbcrNo: z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
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
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.'
    )
    .optional(),
  crtDtTo: z.string()
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.'
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

// 타입 추출
export type CreateCategorySubscribeType = z.infer<typeof createCategorySubscribeSchema>;
export type UpdateCategorySubscribeType = z.infer<typeof updateCategorySubscribeSchema>;
export type DeleteCategorySubscribeType = z.infer<typeof deleteCategorySubscribeSchema>;
export type SearchCategorySubscribeType = z.infer<typeof searchCategorySubscribeSchema>;
