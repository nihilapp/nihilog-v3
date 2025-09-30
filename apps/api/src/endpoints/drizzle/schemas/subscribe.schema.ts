import { z } from 'zod';

import { categorySubscribeItemListSchema } from '@/endpoints/drizzle/schemas/category-subscribe.schema';
import { commonSchema, ynEnumSchema } from '@/endpoints/drizzle/schemas/common.schema';
import { baseSearchSchema } from '@/endpoints/drizzle/schemas/search.schema';
import { tagSubscribeItemListSchema } from '@/endpoints/drizzle/schemas/tag-subscribe.schema';
import { userInfoSchema } from '@/endpoints/drizzle/schemas/user.schema';

// Zod 스키마 정의

const userSubscribeBaseSchema = commonSchema.extend({
  sbcrNo: z.coerce.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
  userNo: z.coerce.number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.'),
  emlNtfyYn: ynEnumSchema
    .default('Y'),
  newPstNtfyYn: ynEnumSchema
    .default('Y'),
  cmntRplNtfyYn: ynEnumSchema
    .default('Y'),
  sbcrCtgryList: z.string()
    .max(1000, '구독 카테고리 목록은 1000자 이하여야 합니다.')
    .nullable()
    .optional(),
  sbcrTagList: z.string()
    .max(1000, '구독 태그 목록은 1000자 이하여야 합니다.')
    .nullable()
    .optional(),
  rowNo: z.number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional(),
  totalCnt: z.number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional(),
  userNoList: z.array(z.number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.'))
    .optional(),
});

const userPickedFields = userInfoSchema.pick({
  userNm: true,
  emlAddr: true,
});

export const userSubscribeRawSchema = userSubscribeBaseSchema.extend(userPickedFields.shape);

// 커스텀 스키마 정의

// 구독 설정 생성용 스키마
export const createSubscribeSchema = userSubscribeRawSchema.pick({
  userNo: true,
  emlNtfyYn: true,
  newPstNtfyYn: true,
  cmntRplNtfyYn: true,
  useYn: true,
  delYn: true,
});

// 구독 설정 수정용 스키마 (카테고리/태그는 배열로 받아서 JSON 변환)
export const updateSubscribeSchema = userSubscribeRawSchema.pick({
  emlNtfyYn: true,
  newPstNtfyYn: true,
  cmntRplNtfyYn: true,
  userNoList: true,
}).partial();

// 구독 설정 조회용 스키마 (JSON 문자열을 배열로 파싱해서 반환)
export const userSubscribeSchema = userSubscribeRawSchema.omit({
  sbcrCtgryList: true,
  sbcrTagList: true,
}).extend({
  sbcrCtgryList: z.array(categorySubscribeItemListSchema)
    .optional(),
  sbcrTagList: z.array(tagSubscribeItemListSchema)
    .optional(),
});

// 구독 설정 기본값 스키마
export const defaultSubscribeSchema = userSubscribeRawSchema.pick({
  emlNtfyYn: true,
  newPstNtfyYn: true,
  cmntRplNtfyYn: true,
  useYn: true,
  delYn: true,
});

// 모든 항목이 선택값인 스키마
export const partialSubscribeSchema = userSubscribeRawSchema.partial();

export const searchSubscribeSchema = baseSearchSchema.extend({
  ...userSubscribeRawSchema.shape,
  srchType: z.enum([ 'userNm', 'emlAddr', ], {
    error: '검색 타입은 userNm, emlAddr 중 하나여야 합니다.',
  }).optional(),
}).partial();

// 타입 추출
export type UserSubscribeType = z
  .infer<typeof userSubscribeSchema>;
export type CreateSubscribeType = z
  .infer<typeof createSubscribeSchema>;
export type UpdateSubscribeType = z
  .infer<typeof updateSubscribeSchema>;
export type DefaultSubscribeType = z
  .infer<typeof defaultSubscribeSchema>;
export type PartialSubscribeType = z
  .infer<typeof partialSubscribeSchema>;
export type SearchSubscribeType = z
  .infer<typeof searchSubscribeSchema>;
