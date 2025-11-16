import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex } from './common.schema';
import { baseSearchSchema } from './search.schema';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

/**
 * @description 카테고리 구독 스키마
 */
export const categorySubscribeSchema = commonSchema.extend({
  ctgrySbcrNo: z
    .number()
    .int('구독 카테고리 번호는 정수여야 합니다.')
    .positive('구독 카테고리 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '카테고리 구독 번호',
      example: 1,
    }),
  sbcrNo: z
    .number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '구독 번호',
      example: 1,
    }),
  ctgryNo: z
    .number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '카테고리 번호',
      example: 1,
    }),
  ctgryNm: z.string()
    .max(
      100,
      '카테고리 이름은 100자 이하여야 합니다.'
    )
    .optional()
    .openapi({
      description: '카테고리 이름',
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
  ctgryNoList: z.array(z
    .number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '카테고리 번호 목록',
      example: [
        1,
        2,
        3,
      ],
    }),
  ctgrySbcrNoList: z.array(z
    .number()
    .int('카테고리 구독 번호는 정수여야 합니다.')
    .positive('카테고리 구독 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '카테고리 구독 번호 목록',
      example: [
        1,
        2,
        3,
      ],
    }),
});

/**
 * @description 카테고리 구독 아이템 리스트 스키마
 */
export const categorySubscribeItemListSchema = categorySubscribeSchema.pick({
  ctgryNo: true,
  ctgryNm: true,
});

/**
 * @description 카테고리 구독 생성용 스키마
 */
export const createCategorySubscribeSchema = categorySubscribeSchema.pick({
  sbcrNo: true,
  ctgryNo: true,
  ctgryNoList: true,
}).partial({
  ctgryNo: true,
});

/**
 * @description 카테고리 구독 수정용 스키마
 */
export const updateCategorySubscribeSchema = categorySubscribeSchema.pick({
  ctgrySbcrNo: true,
  sbcrNo: true,
  ctgryNo: true,
  useYn: true,
  delYn: true,
  ctgryNoList: true,
  ctgrySbcrNoList: true,
}).partial();

/**
 * @description 카테고리 구독 삭제용 스키마
 */
export const deleteCategorySubscribeSchema = categorySubscribeSchema.pick({
  ctgrySbcrNoList: true,
  sbcrNo: true,
}).partial();

/**
 * @description 카테고리 구독 검색용 스키마
 */
export const searchCategorySubscribeSchema = baseSearchSchema.extend({
  ...categorySubscribeSchema.pick({
    delYn: true,
    useYn: true,
    ctgryNo: true,
    sbcrNo: true,
  }).shape,
  srchType: z.enum(
    [
      'ctgryNm',
      'userNm',
      'ctgryExpln',
    ],
    {
      error: '검색 타입은 ctgryNm, userNm, ctgryExpln 중 하나여야 합니다.',
    }
  ).optional().openapi({
    description: '검색 타입 (ctgryNm: 카테고리명, userNm: 사용자명, ctgryExpln: 카테고리 설명)',
    example: 'ctgryNm',
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
    'CTGRY_SBCR_LATEST',
    'CTGRY_SBCR_OLDEST',
    'CTGRY_NAME_ASC',
    'CTGRY_NAME_DESC',
    'USER_NAME_ASC',
    'USER_NAME_DESC',
  ])
    .default('CTGRY_SBCR_LATEST')
    .optional().openapi({
      description: '정렬 기준 (CTGRY_SBCR_LATEST: 카테고리 구독 최신순, CTGRY_SBCR_OLDEST: 카테고리 구독 오래된순, CTGRY_NAME_ASC: 카테고리명 순, CTGRY_NAME_DESC: 카테고리명 역순, USER_NAME_ASC: 사용자명 순, USER_NAME_DESC: 사용자명 역순)',
      example: 'CTGRY_SBCR_LATEST',
    }),
}).partial();

// 타입 정의

/**
 * @description 카테고리 구독 타입
 */
export type CategorySubscribeType = z.infer<typeof categorySubscribeSchema>;

/**
 * @description 카테고리 구독 정보 타입
 */
export type CategorySubscribeInfoType = Partial<CategorySubscribeType>;

/**
 * @description 카테고리 구독 아이템 리스트 타입
 */
export type CategorySubscribeItemListType = z.infer<typeof categorySubscribeItemListSchema>;

/**
 * @description 카테고리 구독 생성 타입
 */
export type CreateCategorySubscribeType = z.infer<typeof createCategorySubscribeSchema>;

/**
 * @description 카테고리 구독 수정 타입
 */
export type UpdateCategorySubscribeType = z.infer<typeof updateCategorySubscribeSchema>;

/**
 * @description 카테고리 구독 삭제 타입
 */
export type DeleteCategorySubscribeType = z.infer<typeof deleteCategorySubscribeSchema>;

/**
 * @description 카테고리 구독 검색 타입
 */
export type SearchCategorySubscribeType = z.infer<typeof searchCategorySubscribeSchema>;
