import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonSchema, ynEnumSchema } from '@/endpoints/prisma/schemas/common.schema';
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
  userNoList: z.array(z.number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '사용자 번호 목록',
      example: [ 1, 2, 3, ],
    }),
});

export const userSubscribeRawSchema = userSubscribeBaseSchema;

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

// 구독 설정 수정용 스키마
export const updateSubscribeSchema = userSubscribeRawSchema.pick({
  emlNtfyYn: true,
  newPstNtfyYn: true,
  cmntRplNtfyYn: true,
  userNoList: true,
}).partial();

// 구독 설정 조회용 스키마 (user 정보 포함)
export const userSubscribeSchema = userSubscribeRawSchema.extend({
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
  ...userSubscribeRawSchema.pick({
    delYn: true,
  }).shape,
  srchType: z.enum([ 'userNm', 'emlAddr', ], {
    error: '검색 타입은 userNm, emlAddr 중 하나여야 합니다.',
  }).optional()
    .openapi({
      description: '검색 타입 (userNm: 사용자명, emlAddr: 이메일 주소)',
      example: 'userNm',
    }),
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
