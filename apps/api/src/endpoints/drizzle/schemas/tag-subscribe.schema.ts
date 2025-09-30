import { z } from 'zod';

import { commonSchema } from '@/endpoints/drizzle/schemas/common.schema';
import { baseSearchSchema } from '@/endpoints/drizzle/schemas/search.schema';

export const tagSubscribeSchema = commonSchema.extend({
  tagSbcrNo: z.coerce.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.')
    .optional(),
  sbcrNo: z.coerce.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
  tagNo: z.coerce.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional(),
  tagNm: z.string()
    .max(100, '태그 이름은 100자 이하여야 합니다.')
    .optional(),
  rowNo: z.coerce.number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional(),
  totalCnt: z.coerce.number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional(),
  tagNoList: z.array(z.coerce.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.'))
    .optional(),
  tagSbcrNoList: z.array(z.coerce.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.'))
    .optional(),
});

export const tagSubscribeItemListSchema = tagSubscribeSchema.pick({
  tagNo: true,
  tagNm: true,
});

// 태그 구독 생성용 스키마
export const createTagSubscribeSchema = tagSubscribeSchema.pick({
  sbcrNo: true,
  tagNo: true,
  useYn: true,
  delYn: true,
  tagNoList: true,
}).partial({
  tagNoList: true,
});

// 태그 구독 수정용 스키마
export const updateTagSubscribeSchema = tagSubscribeSchema.pick({
  tagSbcrNo: true,
  sbcrNo: true,
  tagNo: true,
  useYn: true,
  delYn: true,
  tagNoList: true,
}).partial();

// 태그 구독 다건 생성용 스키마
export const multipleCreateTagSubscribeSchema = tagSubscribeSchema.pick({
  sbcrNo: true,
  tagNoList: true,
  useYn: true,
  delYn: true,
});

// 태그 구독 다건 수정용 스키마
export const multipleUpdateTagSubscribeSchema = tagSubscribeSchema.pick({
  tagSbcrNoList: true,
  sbcrNo: true,
  tagNoList: true,
  useYn: true,
  delYn: true,
}).partial();

// 태그 구독 다건 삭제용 스키마
export const multipleDeleteTagSubscribeSchema = tagSubscribeSchema.pick({
  tagSbcrNoList: true,
  sbcrNo: true,
});

// 태그 구독 검색용 스키마
export const searchTagSubscribeSchema = baseSearchSchema.extend({
  ...tagSubscribeSchema.shape,
  srchType: z.enum([ 'tagNm', ], {
    error: '검색 타입은 tagNm 여야 합니다.',
  }).optional(),
}).partial();

export type TagSubscribeType = z.infer<typeof tagSubscribeSchema>;
export type TagSubscribeInfoType = Partial<TagSubscribeType>;
export type TagSubscribeItemListType = z.infer<typeof tagSubscribeItemListSchema>;
export type CreateTagSubscribeType = z.infer<typeof createTagSubscribeSchema>;
export type UpdateTagSubscribeType = z.infer<typeof updateTagSubscribeSchema>;
export type MultipleCreateTagSubscribeType = z.infer<typeof multipleCreateTagSubscribeSchema>;
export type MultipleUpdateTagSubscribeType = z.infer<typeof multipleUpdateTagSubscribeSchema>;
export type MultipleDeleteTagSubscribeType = z.infer<typeof multipleDeleteTagSubscribeSchema>;
export type SearchTagSubscribeType = z.infer<typeof searchTagSubscribeSchema>;
