import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonSchema, ynEnumSchema, dateTimeMessage, dateTimeRegex } from './common.schema';
import { postStatusSchema as basePostStatusSchema } from './enums.schema';
import { baseSearchSchema } from './search.schema';

import { categoryInfoSchema } from './category.schema';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

// 포스트 상태 스키마 (에러 메시지 및 OpenAPI 설정 추가)
const postStatusSchema = basePostStatusSchema
  .refine(
    (val) => val === 'EMPTY' || val === 'WRITING' || val === 'FINISHED',
    {
      message: '올바른 포스트 상태를 입력해주세요.',
    }
  )
  .openapi({
    description: '게시물 상태 (EMPTY: 초안 없음, WRITING: 작성중, FINISHED: 작성완료)',
    example: 'EMPTY',
  });

// 카테고리 정보가 포함된 포스트 스키마
export const postSchema = commonSchema.extend({
  pstNo: z.coerce
    .number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '포스트 번호',
      example: 1,
    }),
  userNo: z.coerce
    .number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.')
    .openapi({
      description: '사용자 번호',
      example: 1,
    }),
  ctgryNo: z.coerce
    .number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .nullable()
    .optional()
    .openapi({
      description: '카테고리 번호',
      example: 1,
    }),
  pstTtl: z
    .string()
    .min(
      1,
      '포스트 제목은 필수입니다.'
    )
    .max(
      255,
      '포스트 제목은 255자를 초과할 수 없습니다.'
    )
    .openapi({
      description: '포스트 제목 (1-255자)',
      example: '포스트 제목입니다',
    }),
  pstSmry: z
    .string()
    .max(
      500,
      '포스트 요약은 500자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional()
    .openapi({
      description: '포스트 요약 (최대 500자)',
      example: '포스트 요약입니다',
    }),
  pstMtxt: z
    .string('포스트 본문은 문자열이어야 합니다.')
    .openapi({
      description: '포스트 본문 (Markdown 형식)',
      example: '# 포스트 제목\n\n포스트 본문 내용입니다.',
    }),
  pstCd: z
    .string()
    .max(
      255,
      '포스트 코드는 255자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional()
    .openapi({
      description: '포스트 코드 (슬러그, 최대 255자)',
      example: 'post-slug',
    }),
  pstThmbLink: z
    .url('올바른 URL 형식이어야 합니다.')
    .nullable()
    .optional()
    .openapi({
      description: '썸네일 링크 (URL 형식)',
      example: 'https://example.com/thumbnail.jpg',
    }),
  pstView: z.coerce
    .number()
    .int('조회수는 정수여야 합니다.')
    .min(
      0,
      '조회수는 0 이상이어야 합니다.'
    )
    .default(0)
    .openapi({
      description: '조회수',
      example: 0,
    }),
  pstStts: postStatusSchema.default('EMPTY'),
  publDt: z
    .string()
    .max(
      50,
      '발행 일시는 50자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional()
    .openapi({
      description: '발행 일시',
      example: '2024-01-01 00:00:00',
    }),
  pinYn: ynEnumSchema.default('N').openapi({
    description: '고정 여부',
    example: 'N',
  }),
  rlsYn: ynEnumSchema.default('Y').openapi({
    description: '공개 여부',
    example: 'Y',
  }),
  archYn: ynEnumSchema.default('N').openapi({
    description: '보관 여부',
    example: 'N',
  }),
  secrYn: ynEnumSchema
    .nullable()
    .optional()
    .openapi({
      description: '비밀글 여부',
      example: 'N',
    }),
  pstPswd: z
    .string()
    .max(
      255,
      '게시물 비밀번호는 255자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional()
    .openapi({
      description: '게시물 비밀번호 (최대 255자)',
      example: 'password123',
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
  pstNoList: z
    .array(z.coerce
      .number()
      .int('포스트 번호는 정수여야 합니다.')
      .positive('포스트 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '포스트 번호 목록 (다건 처리용)',
      example: [
        1,
        2,
        3,
      ],
    }),
  // 카테고리 정보 포함
  category: categoryInfoSchema
    .nullable()
    .optional()
    .openapi({
      description: '카테고리 정보',
    }),
});

// 포스트 생성 스키마
export const createPostSchema = postSchema.pick({
  pstTtl: true,
  pstSmry: true,
  pstMtxt: true,
  pstCd: true,
  pstThmbLink: true,
  pstStts: true,
  publDt: true,
  pinYn: true,
  rlsYn: true,
  archYn: true,
  secrYn: true,
  pstPswd: true,
  ctgryNo: true,
  useYn: true,
  delYn: true,
}).partial({
  pstSmry: true,
  pstCd: true,
  pstThmbLink: true,
  pstStts: true,
  publDt: true,
  pinYn: true,
  rlsYn: true,
  archYn: true,
  secrYn: true,
  pstPswd: true,
  ctgryNo: true,
  useYn: true,
  delYn: true,
});

// 포스트 수정 스키마 (단일/다건 통합)
export const updatePostSchema = postSchema.partial().pick({
  pstTtl: true,
  pstSmry: true,
  pstMtxt: true,
  pstCd: true,
  pstThmbLink: true,
  pstStts: true,
  publDt: true,
  pinYn: true,
  rlsYn: true,
  archYn: true,
  secrYn: true,
  pstPswd: true,
  ctgryNo: true,
  useYn: true,
  delYn: true,
  pstNoList: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  delDt: true,
});

// 포스트 검색 스키마 (기본 검색 스키마 확장)
export const searchPostSchema = baseSearchSchema.extend({
  ...postSchema.pick({
    delYn: true,
    pstStts: true,
    rlsYn: true,
    archYn: true,
  }).shape,
  srchType: z.enum(
    [
      'pstTtl',
      'pstSmry',
    ],
    {
      error: '검색 타입은 pstTtl 또는 pstSmry 여야 합니다.',
    }
  )
    .optional()
    .openapi({
      description: '검색 타입 (pstTtl: 제목, pstSmry: 요약)',
      example: 'pstTtl',
    }),

  // 태그/카테고리 필터
  tagNoList: z.array(z.coerce
    .number()
    .int()
    .positive())
    .optional()
    .openapi({
      description: '태그 번호 목록 (AND 조건)',
      example: [
        1,
        2,
        3,
      ],
    }),
  ctgryNoList: z.array(z.coerce
    .number()
    .int()
    .positive())
    .optional()
    .openapi({
      description: '카테고리 번호 목록 (OR 조건)',
      example: [
        1,
        2,
      ],
    }),

  // 정렬 옵션
  orderBy: z.enum([
    'LATEST',
    'POPULAR',
    'OLDEST',
  ])
    .default('LATEST')
    .openapi({
      description: '정렬 기준 (LATEST: 최신순, POPULAR: 인기순, OLDEST: 오래된 순)',
      example: 'LATEST',
    }),
}).partial();

// 포스트 삭제 스키마 (포스트 번호 또는 리스트 선택)
export const deletePostSchema = postSchema.pick({
  pstNoList: true,
}).refine(
  (data) => data.pstNoList,
  {
    message: '포스트 번호 목록은 필수입니다.',
  }
);

// 포스트 북마크 스키마 (포스트와 카테고리 정보 포함)
export const postBookmarkSchema = commonSchema.extend({
  bkmrkNo: z.coerce
    .number()
    .int('북마크 번호는 정수여야 합니다.')
    .positive('북마크 번호는 양수여야 합니다.')
    .openapi({
      description: '북마크 번호',
      example: 1,
    }),
  userNo: z.coerce
    .number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.')
    .openapi({
      description: '사용자 번호',
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
  // 포스트 정보 포함 (카테고리 정보도 포함)
  post: postSchema
    .optional()
    .openapi({
      description: '포스트 정보 (카테고리 포함)',
    }),
});

export const createPostBookmarkSchema = postBookmarkSchema.pick({
  userNo: true,
  pstNo: true,
});

export const deletePostBookmarkSchema = postBookmarkSchema.pick({
  bkmrkNo: true,
});

export const searchPostBookmarkSchema = baseSearchSchema.extend({
  ...postBookmarkSchema.pick({
    pstNo: true,
    delYn: true,
  }).shape,
}).partial();

// 타입 추출
export type PostType = z.infer<typeof postSchema>;
export type PostInfoType = Partial<PostType>;
export type CreatePostType = z.infer<typeof createPostSchema>;
export type UpdatePostType = z.infer<typeof updatePostSchema>;
export type DeletePostType = z.infer<typeof deletePostSchema>;
export type SearchPostType = z.infer<typeof searchPostSchema>;
export type CreatePostBookmarkType = z.infer<typeof createPostBookmarkSchema>;
export type DeletePostBookmarkType = z.infer<typeof deletePostBookmarkSchema>;
export type SearchPostBookmarkType = z.infer<typeof searchPostBookmarkSchema>;

// 포스트 조회 로그 스키마
export const postViewLogSchema = z.object({
  viewNo: z.coerce
    .number()
    .int('조회 번호는 정수여야 합니다.')
    .positive('조회 번호는 양수여야 합니다.')
    .openapi({
      description: '조회 번호',
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
  viewerIp: z.string()
    .nullable()
    .optional()
    .openapi({
      description: '조회자 IP',
      example: '127.0.0.1',
    }),
  viewDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .openapi({
      description: '조회 일시 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
});

// 포스트 조회 로그 생성 스키마
export const createPostViewLogSchema = z.object({
  pstNo: z.coerce
    .number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.')
    .openapi({
      description: '포스트 번호',
      example: 1,
    }),
  ip: z
    .string()
    .min(
      1,
      'IP 주소는 필수입니다.'
    )
    .openapi({
      description: '조회자 IP',
      example: '127.0.0.1',
    }),
});

// 포스트 공유 로그 스키마
export const postShareLogSchema = z.object({
  shrnNo: z.coerce
    .number()
    .int('공유 번호는 정수여야 합니다.')
    .positive('공유 번호는 양수여야 합니다.')
    .openapi({
      description: '공유 번호',
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
  shrnSite: z.string()
    .openapi({
      description: '공유 사이트',
      example: 'https://example.com',
    }),
  shrnDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .openapi({
      description: '공유 일시',
      example: '2024-01-01 00:00:00',
    }),
});

// 포스트 공유 로그 생성 스키마
export const createPostShareLogSchema = postShareLogSchema.pick({
  pstNo: true,
  shrnSite: true,
  shrnDt: true,
});

// 타입 추출
export type PostViewLogSchemaType = z.infer<typeof postViewLogSchema>;
export type CreatePostViewLogSchemaType = z.infer<typeof createPostViewLogSchema>;
export type PostShareLogSchemaType = z.infer<typeof postShareLogSchema>;
export type CreatePostShareLogSchemaType = z.infer<typeof createPostShareLogSchema>;
