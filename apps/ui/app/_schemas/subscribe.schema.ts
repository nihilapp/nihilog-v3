import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex, ynEnumSchema } from './common.schema';
import { baseSearchSchema } from './search.schema';

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
  rowNo: z.number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional(),
  totalCnt: z.number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional(),
  sbcrNoList: z.array(z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.'))
    .optional(),
});

const rawUserSubscribeSchema = userSubscribeBaseSchema;

export const selectUserSubscribeSchema = rawUserSubscribeSchema.omit({
  rowNo: true,
  totalCnt: true,
  sbcrNoList: true,
});

export const selectUserSubscribeListSchema = rawUserSubscribeSchema.omit({
  sbcrNoList: true,
});

// UserSbcrInfo 테이블 컬럼만 pick (Prisma 테이블 구조)
export const userSbcrInfoTableSchema = rawUserSubscribeSchema.pick({
  sbcrNo: true,
  userNo: true,
  emlNtfyYn: true,
  newPstNtfyYn: true,
  cmntRplNtfyYn: true,
  useYn: true,
  delYn: true,
  crtNo: true,
  crtDt: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  delDt: true,
});

// 커스텀 스키마 정의

// 구독 설정 생성용 스키마
export const createSubscribeSchema = rawUserSubscribeSchema.pick({
  userNo: true,
  emlNtfyYn: true,
  newPstNtfyYn: true,
  cmntRplNtfyYn: true,
  useYn: true,
  delYn: true,
});

// 구독 설정 수정용 스키마
export const updateSubscribeSchema = rawUserSubscribeSchema.pick({
  emlNtfyYn: true,
  newPstNtfyYn: true,
  cmntRplNtfyYn: true,
  sbcrNoList: true,
}).partial();

export const deleteSubscribeSchema = rawUserSubscribeSchema.pick({
  sbcrNo: true,
  sbcrNoList: true,
}).refine(
  (data) => data.sbcrNo || data.sbcrNoList,
  {
    message: '구독 번호 또는 구독 번호 목록 중 하나는 필수입니다.',
  }
);

// 구독 설정 조회용 스키마 (user 정보 포함)
export const userSubscribeSchema = selectUserSubscribeSchema.extend({
  user: z.object({
    userNm: z.string(),
    emlAddr: z.email(),
  }),
});

// 구독 설정 기본값 스키마
export const defaultSubscribeSchema = rawUserSubscribeSchema.pick({
  emlNtfyYn: true,
  newPstNtfyYn: true,
  cmntRplNtfyYn: true,
  useYn: true,
  delYn: true,
});

// 모든 항목이 선택값인 스키마
export const partialSubscribeSchema = rawUserSubscribeSchema.partial();

export const searchSubscribeSchema = baseSearchSchema.extend({
  ...rawUserSubscribeSchema.pick({
    delYn: true,
    useYn: true,
    emlNtfyYn: true,
    newPstNtfyYn: true,
    cmntRplNtfyYn: true,
  }).shape,
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
export type UserSubscribeType = z
  .infer<typeof userSubscribeSchema>;
export type UserSbcrInfoTableType = z.infer<typeof userSbcrInfoTableSchema>;
export type CreateSubscribeType = z
  .infer<typeof createSubscribeSchema>;
export type UpdateSubscribeType = z
  .infer<typeof updateSubscribeSchema>;
export type DeleteSubscribeType = z
  .infer<typeof deleteSubscribeSchema>;
export type DefaultSubscribeType = z
  .infer<typeof defaultSubscribeSchema>;
export type PartialSubscribeType = z
  .infer<typeof partialSubscribeSchema>;
export type SearchSubscribeType = z
  .infer<typeof searchSubscribeSchema>;
