import { z } from 'zod';

// 공통 스키마 import
import { ynEnumSchema, baseSearchSchema } from './common.schema';

// 구독 요청 스키마들

// 구독 설정 생성 스키마
export const createSubscribeSchema = z.object({
  userNo: z.number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.'),
  emlNtfyYn: ynEnumSchema.default('Y'),
  newPstNtfyYn: ynEnumSchema.default('Y'),
  cmntRplNtfyYn: ynEnumSchema.default('Y'),
  useYn: ynEnumSchema.default('Y'),
  delYn: ynEnumSchema.default('N'),
});

// 구독 설정 수정 스키마
export const updateSubscribeSchema = z.object({
  emlNtfyYn: ynEnumSchema.optional(),
  newPstNtfyYn: ynEnumSchema.optional(),
  cmntRplNtfyYn: ynEnumSchema.optional(),
  sbcrNoList: z.array(z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.'))
    .optional(),
}).partial();

// 구독 설정 삭제 스키마
export const deleteSubscribeSchema = z.object({
  sbcrNo: z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
  sbcrNoList: z.array(z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.'))
    .optional(),
}).refine(
  (data) => data.sbcrNo || data.sbcrNoList,
  {
    message: '구독 번호 또는 구독 번호 목록 중 하나는 필수입니다.',
  }
);

// 구독 설정 검색 스키마
export const searchSubscribeSchema = baseSearchSchema.extend({
  delYn: ynEnumSchema.optional(),
  useYn: ynEnumSchema.optional(),
  emlNtfyYn: ynEnumSchema.optional(),
  newPstNtfyYn: ynEnumSchema.optional(),
  cmntRplNtfyYn: ynEnumSchema.optional(),
  srchType: z.enum(
    [
      'userNm',
      'emlAddr',
    ],
    {
      error: '검색 타입은 userNm, emlAddr 중 하나여야 합니다.',
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
  orderBy: z.enum(
    [
      'SBSCR_LATEST',
      'SBSCR_OLDEST',
      'USER_NAME_ASC',
      'USER_NAME_DESC',
      'EMAIL_ASC',
      'EMAIL_DESC',
    ],
    {
      error: '정렬 옵션은 SBSCR_LATEST, SBSCR_OLDEST, USER_NAME_ASC, USER_NAME_DESC, EMAIL_ASC, EMAIL_DESC 중 하나여야 합니다.',
    }
  ).optional(),
}).partial();

// 타입 추출
export type CreateSubscribeType = z.infer<typeof createSubscribeSchema>;
export type UpdateSubscribeType = z.infer<typeof updateSubscribeSchema>;
export type DeleteSubscribeType = z.infer<typeof deleteSubscribeSchema>;
export type SearchSubscribeType = z.infer<typeof searchSubscribeSchema>;
