import { z } from 'zod';

import { yn } from '@drizzle/enums';

// Drizzle enum을 Zod 스키마로 변환
export const ynEnumSchema = z.enum(yn.enumValues, '올바른 값을 입력해주세요.');

// 날짜시간 형식 검증용 정규식
const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
const dateTimeMessage = 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.';

// Zod 스키마 정의

export const userSubscriptionRawSchema = z.object({
  sbcrNo: z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
  userNo: z.number()
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
  useYn: ynEnumSchema
    .default('Y'),
  delYn: ynEnumSchema
    .default('N'),
  crtNo: z.number()
    .int('생성자 번호는 정수여야 합니다.')
    .nullable()
    .optional(),
  crtDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional(),
  updtNo: z.number()
    .int('수정자 번호는 정수여야 합니다.')
    .nullable()
    .optional(),
  updtDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional(),
  delNo: z.number()
    .int('삭제자 번호는 정수여야 합니다.')
    .nullable()
    .optional(),
  delDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional(),
});

// 커스텀 스키마 정의

// 구독 설정 생성용 스키마
export const createSubscriptionSchema = userSubscriptionRawSchema.pick({
  userNo: true,
  emlNtfyYn: true,
  newPstNtfyYn: true,
  cmntRplNtfyYn: true,
  sbcrCtgryList: true,
  sbcrTagList: true,
});

// 구독 설정 수정용 스키마 (카테고리/태그는 배열로 받아서 JSON 변환)
export const updateSubscriptionSchema = z.object({
  emlNtfyYn: ynEnumSchema.optional(),
  newPstNtfyYn: ynEnumSchema.optional(),
  cmntRplNtfyYn: ynEnumSchema.optional(),
  sbcrCtgryList: z.array(z.number().int().positive())
    .optional(),
  sbcrTagList: z.array(z.number().int().positive())
    .optional(),
});

// 구독 설정 조회용 스키마 (JSON 문자열을 배열로 파싱해서 반환)
export const userSubscriptionSchema = userSubscriptionRawSchema.omit({
  sbcrCtgryList: true,
  sbcrTagList: true,
}).extend({
  sbcrCtgryList: z.array(z.number()).optional(),
  sbcrTagList: z.array(z.number()).optional(),
});

// 구독 설정 기본값 스키마
export const defaultSubscriptionSchema = userSubscriptionRawSchema.pick({
  emlNtfyYn: true,
  newPstNtfyYn: true,
  cmntRplNtfyYn: true,
  useYn: true,
  delYn: true,
});

// 모든 항목이 선택값인 스키마
export const partialSubscriptionSchema = userSubscriptionRawSchema.partial();

// 타입 추출
export type UserSubscriptionType = z
  .infer<typeof userSubscriptionSchema>;
export type CreateSubscriptionType = z
  .infer<typeof createSubscriptionSchema>;
export type UpdateSubscriptionType = z
  .infer<typeof updateSubscriptionSchema>;
export type DefaultSubscriptionType = z
  .infer<typeof defaultSubscriptionSchema>;
export type PartialSubscriptionType = z
  .infer<typeof partialSubscriptionSchema>;
