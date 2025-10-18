import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonSchema } from '@/endpoints/prisma/schemas/common.schema';
import { baseSearchSchema } from '@/endpoints/prisma/schemas/search.schema';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

// 태그 정보 스키마
export const tagInfoSchema = commonSchema.extend({
  tagNo: z.coerce
    .number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '태그 번호',
      example: 1,
    }),
  tagNm: z
    .string()
    .min(
      1,
      '태그명은 필수입니다.'
    )
    .max(
      50,
      '태그명은 50자를 초과할 수 없습니다.'
    )
    .openapi({
      description: '태그명 (1-50자)',
      example: 'JavaScript',
    }),
  tagExpln: z
    .string()
    .max(
      200,
      '태그 설명은 200자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional()
    .openapi({
      description: '태그 설명 (최대 200자)',
      example: 'JavaScript 프로그래밍 언어',
    }),
  tagColr: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      '색상은 #RRGGBB 형식이어야 합니다.'
    )
    .nullable()
    .optional()
    .openapi({
      description: '태그 색상 (#RRGGBB 형식)',
      example: '#FF5733',
    }),
  rowNo: z.coerce
    .number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '행 번호 (페이징)',
      example: 1,
    }),
  totalCnt: z.coerce
    .number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '총 개수 (페이징)',
      example: 10,
    }),
  tagNoList: z
    .array(z.coerce
      .number()
      .int('태그 번호는 정수여야 합니다.')
      .positive('태그 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '태그 번호 목록 (다건 처리용)',
      example: [
        1,
        2,
        3,
      ],
    }),
});

// 태그 생성 스키마
export const createTagSchema = tagInfoSchema.pick({
  tagNm: true,
  tagExpln: true,
  tagColr: true,
  useYn: true,
  delYn: true,
}).partial({
  tagExpln: true,
  tagColr: true,
  useYn: true,
  delYn: true,
});

// 태그 수정 스키마 (단일/다건 통합)
export const updateTagSchema = tagInfoSchema.partial().pick({
  tagNo: true,
  tagNm: true,
  tagExpln: true,
  tagColr: true,
  useYn: true,
  delYn: true,
  tagNoList: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  delDt: true,
});

// 태그 검색 스키마 (기본 검색 스키마 확장)
export const searchTagSchema = baseSearchSchema.extend({
  ...tagInfoSchema.pick({
    delYn: true,
  }).shape,
  srchMode: z.enum(
    [
      'USER',
      'ADMIN',
    ],
    {
      error: '검색 모드는 USER 또는 ADMIN 여야 합니다.',
    }
  ).optional()
    .openapi({
      description: '검색 모드 (USER: 일반 사용자, ADMIN: 관리자)',
      example: 'USER',
    }),
  srchType: z.enum(
    [
      'tagNm',
      'tagExpln',
    ],
    {
      error: '검색 타입은 tagNm 또는 tagExpln 여야 합니다.',
    }
  )
    .optional()
    .openapi({
      description: '검색 타입 (tagNm: 태그명, tagExpln: 태그 설명)',
      example: 'tagNm',
    }),
  orderBy: z.enum([
    'LATEST',
    'OLDEST',
    'POPULAR',
    'UNPOPULAR',
  ])
    .default('LATEST')
    .openapi({
      description: '정렬 기준 (LATEST: 최신순, OLDEST: 오래된 순, POPULAR: 인기순, UNPOPULAR: 미인기순)',
      example: 'LATEST',
    }),
  postCountMin: z.coerce
    .number()
    .int('사용 포스트 수는 정수여야 합니다.')
    .min(
      0,
      '사용 포스트 수는 0 이상이어야 합니다.'
    )
    .optional()
    .openapi({
      description: '사용 포스트 수 (최소)',
      example: 0,
    }),
  postCountMax: z.coerce
    .number()
    .int('사용 포스트 수는 정수여야 합니다.')
    .min(
      0,
      '사용 포스트 수는 0 이상이어야 합니다.'
    )
    .optional()
    .openapi({
      description: '사용 포스트 수 (최대)',
      example: 0,
    }),
  subscriberCountMin: z.coerce
    .number()
    .int('구독자 수는 정수여야 합니다.')
    .min(
      0,
      '구독자 수는 0 이상이어야 합니다.'
    )
    .optional()
    .openapi({
      description: '구독자 수 (최소)',
      example: 0,
    }),
  subscriberCountMax: z.coerce
    .number()
    .int('구독자 수는 정수여야 합니다.')
    .min(
      0,
      '구독자 수는 0 이상이어야 합니다.'
    )
    .optional()
    .openapi({
      description: '구독자 수 (최대)',
      example: 0,
    }),
}).partial();

// 태그 삭제 스키마 (태그 번호 또는 리스트 선택)
export const deleteTagSchema = tagInfoSchema.pick({
  tagNo: true,
  tagNoList: true,
}).refine(
  (data) => data.tagNo || data.tagNoList,
  {
    message: '태그 번호 또는 태그 번호 목록 중 하나는 필수입니다.',
  }
);

// 포스트-태그 매핑 스키마
export const pstTagMpngSchema = commonSchema.extend({
  tagMapNo: z.coerce
    .number()
    .int('태그 매핑 번호는 정수여야 합니다.')
    .positive('태그 매핑 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '태그 매핑 번호',
      example: 1,
    }),
  pstNo: z.coerce
    .number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.')
    .openapi({
      description: '포스트 번호',
      example: 1,
    }),
  tagNo: z.coerce
    .number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .openapi({
      description: '태그 번호',
      example: 1,
    }),
  rowNo: z.coerce
    .number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '행 번호 (페이징)',
      example: 1,
    }),
  totalCnt: z.coerce
    .number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '총 개수 (페이징)',
      example: 10,
    }),
  tagMapNoList: z
    .array(z.coerce
      .number()
      .int('태그 매핑 번호는 정수여야 합니다.')
      .positive('태그 매핑 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '태그 매핑 번호 목록 (다건 처리용)',
      example: [
        1,
        2,
        3,
      ],
    }),
});

// 포스트-태그 매핑 생성 스키마
export const createPstTagMpngSchema = pstTagMpngSchema.pick({
  pstNo: true,
  tagNo: true,
  useYn: true,
  delYn: true,
}).partial({
  useYn: true,
  delYn: true,
});

// 포스트-태그 매핑 수정 스키마 (단일/다건 통합)
export const updatePstTagMpngSchema = pstTagMpngSchema.partial().pick({
  tagMapNo: true,
  pstNo: true,
  tagNo: true,
  useYn: true,
  delYn: true,
  tagMapNoList: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  delDt: true,
});

// 포스트-태그 매핑 검색 스키마 (기본 검색 스키마 확장)
export const searchPstTagMpngSchema = baseSearchSchema.extend({
  ...pstTagMpngSchema.pick({
    pstNo: true,
    delYn: true,
  }).shape,
}).partial();

// 포스트-태그 매핑 삭제 스키마 (매핑 번호 또는 리스트 선택)
export const deletePstTagMpngSchema = pstTagMpngSchema.pick({
  tagMapNo: true,
  tagMapNoList: true,
}).refine(
  (data) => data.tagMapNo || data.tagMapNoList,
  {
    message: '태그 매핑 번호 또는 태그 매핑 번호 목록 중 하나는 필수입니다.',
  }
);

// 타입 추출
export type TagInfoType = z.infer<typeof tagInfoSchema>;
export type CreateTagType = z.infer<typeof createTagSchema>;
export type UpdateTagType = z.infer<typeof updateTagSchema>;
export type SearchTagType = z.infer<typeof searchTagSchema>;
export type DeleteTagType = z.infer<typeof deleteTagSchema>;

export type PstTagMpngType = z.infer<typeof pstTagMpngSchema>;
export type CreatePstTagMpngType = z.infer<typeof createPstTagMpngSchema>;
export type UpdatePstTagMpngType = z.infer<typeof updatePstTagMpngSchema>;
export type SearchPstTagMpngType = z.infer<typeof searchPstTagMpngSchema>;
export type DeletePstTagMpngType = z.infer<typeof deletePstTagMpngSchema>;
