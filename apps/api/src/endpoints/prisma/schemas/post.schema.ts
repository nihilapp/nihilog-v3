import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonSchema, ynEnumSchema } from '@/endpoints/prisma/schemas/common.schema';
import { postStatusSchema as basePostStatusSchema } from '@/endpoints/prisma/schemas/enums.schema';
import { baseSearchSchema } from '@/endpoints/prisma/schemas/search.schema';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

// 게시글 상태 스키마 (에러 메시지 및 OpenAPI 설정 추가)
const postStatusSchema = basePostStatusSchema
  .refine((val) => val === 'EMPTY' || val === 'WRITING' || val === 'FINISHED', {
    message: '올바른 게시글 상태를 입력해주세요.',
  })
  .openapi({
    description: '게시물 상태 (EMPTY: 초안 없음, WRITING: 작성중, FINISHED: 작성완료)',
    example: 'EMPTY',
  });

// 기본 게시글 스키마
export const postSchema = commonSchema.extend({
  pstNo: z.coerce
    .number()
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '게시글 번호',
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
    .min(1, '게시글 제목은 필수입니다.')
    .max(255, '게시글 제목은 255자를 초과할 수 없습니다.')
    .openapi({
      description: '게시글 제목 (1-255자)',
      example: '게시글 제목입니다',
    }),
  pstSmry: z
    .string()
    .max(500, '게시글 요약은 500자를 초과할 수 없습니다.')
    .nullable()
    .optional()
    .openapi({
      description: '게시글 요약 (최대 500자)',
      example: '게시글 요약입니다',
    }),
  pstMtxt: z
    .record(z.string(), z.any(), '게시글 본문은 JSON 형태여야 합니다.')
    .openapi({
      description: '게시글 본문 (JSON 형식)',
      example: { content: '게시글 본문입니다', },
    }),
  pstCd: z
    .string()
    .max(255, '게시글 코드는 255자를 초과할 수 없습니다.')
    .nullable()
    .optional()
    .openapi({
      description: '게시글 코드 (슬러그, 최대 255자)',
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
    .min(0, '조회수는 0 이상이어야 합니다.')
    .default(0)
    .openapi({
      description: '조회수',
      example: 0,
    }),
  pstStts: postStatusSchema.default('EMPTY'),
  publDt: z
    .string()
    .max(50, '발행 일시는 50자를 초과할 수 없습니다.')
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
    .max(255, '게시물 비밀번호는 255자를 초과할 수 없습니다.')
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
      .int('게시글 번호는 정수여야 합니다.')
      .positive('게시글 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '게시글 번호 목록 (다건 처리용)',
      example: [ 1, 2, 3, ],
    }),
});

// 게시글 생성 스키마
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

// 게시글 수정 스키마 (단일/다건 통합)
export const updatePostSchema = postSchema.partial().pick({
  pstNo: true,
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

// 게시글 검색 스키마 (기본 검색 스키마 확장)
export const searchPostSchema = baseSearchSchema.extend({
  ...postSchema.pick({
    delYn: true,
    pstStts: true,
    rlsYn: true,
    archYn: true,
  }).shape,
  srchType: z.enum([ 'pstTtl', 'pstSmry', ], {
    error: '검색 타입은 pstTtl 또는 pstSmry 여야 합니다.',
  })
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
      example: [ 1, 2, 3, ],
    }),
  ctgryNoList: z.array(z.coerce
    .number()
    .int()
    .positive())
    .optional()
    .openapi({
      description: '카테고리 번호 목록 (OR 조건)',
      example: [ 1, 2, ],
    }),

  // 정렬 옵션
  orderBy: z.enum([ 'LATEST', 'POPULAR', 'OLDEST', ])
    .default('LATEST')
    .openapi({
      description: '정렬 기준 (LATEST: 최신순, POPULAR: 인기순, OLDEST: 관련도순)',
      example: 'LATEST',
    }),
}).partial();

// 게시글 삭제 스키마 (포스트 번호 또는 리스트 선택)
export const deletePostSchema = postSchema.pick({
  pstNo: true,
  pstNoList: true,
}).refine((data) => data.pstNo || data.pstNoList, {
  message: '게시글 번호 또는 게시글 번호 목록 중 하나는 필수입니다.',
});

// 게시글 조회수 통계 스키마
export const viewStatSchema = z.object({
  mode: z.enum([ 'daily', 'weekly', 'monthly', 'yearly', ])
    .default('daily')
    .openapi({
      description: '모드 (daily: 일간, weekly: 주간, monthly: 월간, yearly: 연간)',
      example: 'daily',
    }),
  startDt: z.string()
    .openapi({
      description: '시작 날짜',
      example: '2024-01-01',
    }),
  endDt: z.string()
    .openapi({
      description: '종료 날짜',
      example: '2024-01-01',
    }),
});

// 게시글 북마크 스키마
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
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.')
    .openapi({
      description: '게시글 번호',
      example: 1,
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
export type ViewStatType = z.infer<typeof viewStatSchema>;
export type CreatePostBookmarkType = z.infer<typeof createPostBookmarkSchema>;
export type DeletePostBookmarkType = z.infer<typeof deletePostBookmarkSchema>;
export type SearchPostBookmarkType = z.infer<typeof searchPostBookmarkSchema>;
