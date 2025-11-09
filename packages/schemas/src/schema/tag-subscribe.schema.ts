import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex } from './common.schema';
import { baseSearchSchema } from './search.schema';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

export const tagSubscribeSchema = commonSchema.extend({
  tagSbcrNo: z.coerce.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '태그 구독 번호',
      example: 1,
    }),
  sbcrNo: z.coerce.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '구독 번호',
      example: 1,
    }),
  tagNo: z.coerce.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '태그 번호',
      example: 1,
    }),
  tagNm: z.string()
    .max(
      100,
      '태그 이름은 100자 이하여야 합니다.'
    )
    .optional()
    .openapi({
      description: '태그 이름',
      example: 'JavaScript',
    }),
  rowNo: z.coerce.number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '행 번호',
      example: 1,
    }),
  totalCnt: z.coerce.number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '총 개수',
      example: 10,
    }),
  tagNoList: z.array(z.coerce.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '태그 번호 목록',
      example: [
        1,
        2,
        3,
      ],
    }),
  tagSbcrNoList: z.array(z.coerce.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '태그 구독 번호 목록',
      example: [
        1,
        2,
        3,
      ],
    }),
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
  tagSbcrNoList: true,
}).partial();

// 태그 구독 삭제용 스키마
export const deleteTagSubscribeSchema = tagSubscribeSchema.pick({
  tagSbcrNoList: true,
  sbcrNo: true,
}).partial();

// 태그 구독 검색용 스키마
export const searchTagSubscribeSchema = baseSearchSchema.extend({
  ...tagSubscribeSchema.pick({
    delYn: true,
    useYn: true,
    tagNo: true,
    sbcrNo: true,
  }).shape,
  srchType: z.enum(
    [
      'tagNm',
      'userNm',
      'tagExpln',
    ],
    {
      error: '검색 타입은 tagNm, userNm 중 하나여야 합니다.',
    }
  ).optional().openapi({
    description: '검색 타입 (tagNm, userNm)',
    example: 'tagNm',
  }),
  crtDtFrom: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional()
    .openapi({
      description: '생성 날짜 시작 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
  crtDtTo: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional()
    .openapi({
      description: '생성 날짜 끝 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-12-31 23:59:59',
    }),
  orderBy: z.enum([
    'TAG_SBCR_LATEST',
    'TAG_SBCR_OLDEST',
    'TAG_NAME_ASC',
    'TAG_NAME_DESC',
    'USER_NAME_ASC',
    'USER_NAME_DESC',
  ])
    .default('TAG_SBCR_LATEST')
    .optional().openapi({
      description: '정렬 기준 (TAG_SBCR_LATEST: 태그 구독 최신순, TAG_SBCR_OLDEST: 태그 구독 오래된순, TAG_NAME_ASC: 태그명 순, TAG_NAME_DESC: 태그명 역순, USER_NAME_ASC: 사용자명 순, USER_NAME_DESC: 사용자명 역순)',
      example: 'TAG_SBCR_LATEST',
    }),
}).partial();

export type TagSubscribeType = z.infer<typeof tagSubscribeSchema>;
export type TagSubscribeInfoType = Partial<TagSubscribeType>;
export type TagSubscribeItemListType = z.infer<typeof tagSubscribeItemListSchema>;
export type CreateTagSubscribeType = z.infer<typeof createTagSubscribeSchema>;
export type UpdateTagSubscribeType = z.infer<typeof updateTagSubscribeSchema>;
export type DeleteTagSubscribeType = z.infer<typeof deleteTagSubscribeSchema>;
export type SearchTagSubscribeType = z.infer<typeof searchTagSubscribeSchema>;
