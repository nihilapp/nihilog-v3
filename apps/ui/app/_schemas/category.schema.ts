import { z } from 'zod';

// 공통 스키마 import
import { ynEnumSchema, baseSearchSchema } from './common.schema';

// 카테고리 요청 스키마들

// 카테고리 생성 스키마
export const createCategorySchema = z.object({
  ctgryNm: z.string()
    .min(1, '카테고리명은 필수입니다.')
    .max(100, '카테고리명은 100자를 초과할 수 없습니다.'),
  ctgryExpln: z.string()
    .max(200, '카테고리 설명은 200자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  ctgryColr: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, '색상은 #RRGGBB 형식이어야 합니다.')
    .nullable()
    .optional(),
  ctgryStp: z.number()
    .int('카테고리 정렬순은 정수여야 합니다.')
    .positive('카테고리 정렬순은 양수여야 합니다.'),
  upCtgryNo: z.number()
    .int('상위 카테고리 번호는 정수여야 합니다.')
    .positive('상위 카테고리 번호는 양수여야 합니다.'),
  useYn: ynEnumSchema.default('Y'),
  delYn: ynEnumSchema.default('N'),
}).partial({
  ctgryExpln: true,
  ctgryColr: true,
  useYn: true,
  delYn: true,
}).required({
  ctgryNm: true,
  ctgryStp: true,
  upCtgryNo: true,
});

// 카테고리 수정 스키마
export const updateCategorySchema = z.object({
  ctgryNo: z.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional(),
  ctgryNm: z.string()
    .min(1, '카테고리명은 필수입니다.')
    .max(100, '카테고리명은 100자를 초과할 수 없습니다.')
    .optional(),
  ctgryExpln: z.string()
    .max(200, '카테고리 설명은 200자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  ctgryColr: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, '색상은 #RRGGBB 형식이어야 합니다.')
    .nullable()
    .optional(),
  ctgryStp: z.number()
    .int('카테고리 정렬순은 정수여야 합니다.')
    .positive('카테고리 정렬순은 양수여야 합니다.')
    .optional(),
  upCtgryNo: z.number()
    .int('상위 카테고리 번호는 정수여야 합니다.')
    .positive('상위 카테고리 번호는 양수여야 합니다.')
    .optional(),
  useYn: ynEnumSchema.optional(),
  delYn: ynEnumSchema.optional(),
}).partial();

// 카테고리 삭제 스키마
export const deleteCategorySchema = z.object({
  ctgryNo: z.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional(),
  ctgryNoList: z.array(z.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.'))
    .optional(),
});

// 카테고리 검색 스키마
export const searchCategorySchema = baseSearchSchema.extend({
  useYn: ynEnumSchema.optional(),
  delYn: ynEnumSchema.optional(),
  ctgryNm: z.string()
    .min(1, '카테고리명은 필수입니다.')
    .max(100, '카테고리명은 100자를 초과할 수 없습니다.')
    .optional(),
  ctgryColr: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, '색상은 #RRGGBB 형식이어야 합니다.')
    .nullable()
    .optional(),
  upCtgryNo: z.number()
    .int('상위 카테고리 번호는 정수여야 합니다.')
    .positive('상위 카테고리 번호는 양수여야 합니다.')
    .optional(),
  srchType: z.enum([
    'ctgryNm', 'ctgryExpln',
  ], {
    error: '검색 타입은 ctgryNm, ctgryExpln 중 하나여야 합니다.',
  }).optional(),
  orderBy: z.enum([
    'LATEST', 'OLDEST', 'NAME_ASC', 'NAME_DESC', 'STP_ASC', 'STP_DESC',
  ], {
    error: '정렬 옵션은 LATEST, OLDEST, NAME_ASC, NAME_DESC, STP_ASC, STP_DESC 중 하나여야 합니다.',
  }).optional(),
  crtDtFrom: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.')
    .optional(),
  crtDtTo: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.')
    .optional(),
}).partial();

// 타입 추출
export type CreateCategoryType = z.infer<typeof createCategorySchema>;
export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;
export type DeleteCategoryType = z.infer<typeof deleteCategorySchema>;
export type SearchCategoryType = z.infer<typeof searchCategorySchema>;
