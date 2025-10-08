import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex, ynEnumSchema } from '@/endpoints/prisma/schemas/common.schema';
import { baseSearchSchema } from '@/endpoints/prisma/schemas/search.schema';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

// Zod 스키마 정의

const userSubscribeBaseSchema = commonSchema.extend({
  sbcrNo: z.coerce.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '구독 번호',
      example: 1,
    }),
  userNo: z.coerce.number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.')
    .openapi({
      description: '사용자 번호',
      example: 1,
    }),
  emlNtfyYn: ynEnumSchema
    .default('Y')
    .openapi({
      description: '이메일 알림 전체 on/off',
      example: 'Y',
    }),
  newPstNtfyYn: ynEnumSchema
    .default('Y')
    .openapi({
      description: '새 글 알림',
      example: 'Y',
    }),
  cmntRplNtfyYn: ynEnumSchema
    .default('Y')
    .openapi({
      description: '내 댓글 답글 알림',
      example: 'Y',
    }),
  rowNo: z.number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '행 번호',
      example: 1,
    }),
  totalCnt: z.number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '총 개수',
      example: 100,
    }),
  sbcrNoList: z.array(z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '구독 번호 목록',
      example: [ 1, 2, 3, ],
    }),
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
}).refine((data) => data.sbcrNo || data.sbcrNoList, {
  message: '구독 번호 또는 구독 번호 목록 중 하나는 필수입니다.',
});

// 구독 설정 조회용 스키마 (user 정보 포함)
export const userSubscribeSchema = selectUserSubscribeSchema.extend({
  user: z.object({
    userNm: z.string()
      .openapi({
        description: '사용자명',
        example: '홍길동',
      }),
    emlAddr: z.email()
      .openapi({
        description: '사용자 이메일 주소',
        example: 'user@example.com',
      }),
  }).openapi({
    description: '사용자 정보',
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
  srchType: z.enum([ 'userNm', 'emlAddr', ], {
    error: '검색 타입은 userNm, emlAddr 중 하나여야 합니다.',
  }).optional()
    .openapi({
      description: '검색 타입 (userNm: 사용자명, emlAddr: 이메일 주소)',
      example: 'userNm',
    }),
  crtDtFrom: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .optional()
    .openapi({
      description: '생성 날짜 시작 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
  crtDtTo: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .optional()
    .openapi({
      description: '생성 날짜 끝 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-12-31 23:59:59',
    }),
  orderBy: z.enum([ 'SBSCR_LATEST', 'SBSCR_OLDEST', 'USER_NAME_ASC', 'USER_NAME_DESC', 'EMAIL_ASC', 'EMAIL_DESC', ], {
    error: '정렬 옵션은 SBSCR_LATEST, SBSCR_OLDEST, USER_NAME_ASC, USER_NAME_DESC, EMAIL_ASC, EMAIL_DESC 중 하나여야 합니다.',
  }).optional()
    .openapi({
      description: '정렬 옵션 (SBSCR_LATEST: 구독 최신순, SBSCR_OLDEST: 구독 오래된순, USER_NAME_ASC: 사용자명 순, USER_NAME_DESC: 사용자명 역순, EMAIL_ASC: 이메일 주소 순, EMAIL_DESC: 이메일 주소 역순)',
      example: 'SBSCR_LATEST',
    }),
}).partial();

// 타입 추출
export type UserSubscribeType = z
  .infer<typeof userSubscribeSchema>;
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
