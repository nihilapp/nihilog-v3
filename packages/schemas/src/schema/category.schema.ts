import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex } from './common.schema';
import { baseSearchSchema } from './search.schema';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

/**
 * @description 카테고리 정보 스키마
 */
export const categoryInfoSchema = commonSchema.extend({
  ctgryNo: z.coerce
    .number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '카테고리 번호',
      example: 1,
    }),
  ctgryNm: z.string()
    .min(
      1,
      '카테고리명은 필수입니다.'
    )
    .max(
      100,
      '카테고리명은 100자를 초과할 수 없습니다.'
    )
    .openapi({
      description: '카테고리명 (1-100자)',
      example: 'JavaScript',
    }),
  ctgryExpln: z.string()
    .max(
      200,
      '카테고리 설명은 200자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional()
    .openapi({
      description: '카테고리 설명 (최대 200자)',
      example: 'JavaScript 프로그래밍 언어',
    }),
  ctgryColr: z.string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      '색상은 #RRGGBB 형식이어야 합니다.'
    )
    .nullable()
    .optional()
    .openapi({
      description: '카테고리 색상 (#RRGGBB 형식)',
      example: '#FF5733',
    }),
  ctgryStp: z.coerce
    .number()
    .int('카테고리 정렬순은 정수여야 합니다.')
    .positive('카테고리 정렬순은 양수여야 합니다.')
    .openapi({
      description: '카테고리 정렬순',
      example: 1,
    }),
  upCtgryNo: z.coerce
    .number()
    .int('상위 카테고리 번호는 정수여야 합니다.')
    .positive('상위 카테고리 번호는 양수여야 합니다.')
    .openapi({
      description: '상위 카테고리 번호',
      example: 1,
    }),
  rowNo: z.coerce
    .number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '행 번호',
      example: 1,
    }),
  totalCnt: z.coerce
    .number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '총 개수',
      example: 10,
    }),
  ctgryNoList: z.array(z.coerce
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
});

/**
 * @description 카테고리 생성 스키마
 */
export const createCategorySchema = categoryInfoSchema.pick({
  ctgryNm: true,
  ctgryExpln: true,
  ctgryColr: true,
  ctgryStp: true,
  upCtgryNo: true,
  useYn: true,
  delYn: true,
})
  .partial()
  .required({
    ctgryNm: true,
    ctgryStp: true,
    upCtgryNo: true,
  });

/**
 * @description 카테고리 수정 스키마
 */
export const updateCategorySchema = categoryInfoSchema.omit({
  rowNo: true,
  totalCnt: true,
  ctgryNoList: true,
}).partial();

/**
 * @description 카테고리 삭제 스키마
 */
export const deleteCategorySchema = categoryInfoSchema.pick({
  ctgryNo: true,
  ctgryNoList: true,
});

/**
 * @description 카테고리 검색 스키마
 */
export const searchCategorySchema = baseSearchSchema.partial().extend({
  ...categoryInfoSchema.pick({
    useYn: true,
    delYn: true,
    ctgryNm: true,
    ctgryColr: true,
    upCtgryNo: true,
  }).shape,
  srchType: z.enum(
    [
      'ctgryNm',
      'ctgryExpln',
    ],
    {
      error: '검색 타입은 ctgryNm, ctgryExpln 중 하나여야 합니다.',
    }
  ).optional().openapi({
    description: '검색 타입 (ctgryNm: 카테고리명, ctgryExpln: 카테고리 설명)',
    example: 'ctgryNm',
  }),
  orderBy: z.enum(
    [
      'LATEST',
      'OLDEST',
      'NAME_ASC',
      'NAME_DESC',
      'STP_ASC',
      'STP_DESC',
    ],
    {
      error: '정렬 옵션은 LATEST, OLDEST, NAME_ASC, NAME_DESC, STP_ASC, STP_DESC 중 하나여야 합니다.',
    }
  ).optional().openapi({
    description: '정렬 옵션 (LATEST: 최신순, OLDEST: 오래된순, NAME_ASC: 이름순, NAME_DESC: 이름역순, STP_ASC: 정렬순, STP_DESC: 정렬역순)',
    example: 'LATEST',
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
}).partial();

// 타입 정의

/**
 * @description 카테고리 정보 타입
 */
export type CategoryInfoType = z.infer<typeof categoryInfoSchema>;

/**
 * @description 카테고리 생성 타입
 */
export type CreateCategoryType = z.infer<typeof createCategorySchema>;

/**
 * @description 카테고리 수정 타입
 */
export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;

/**
 * @description 카테고리 삭제 타입
 */
export type DeleteCategoryType = z.infer<typeof deleteCategorySchema>;

/**
 * @description 카테고리 검색 타입
 */
export type SearchCategoryType = z.infer<typeof searchCategorySchema>;
