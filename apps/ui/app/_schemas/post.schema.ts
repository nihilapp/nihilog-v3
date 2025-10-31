import { z } from 'zod';

import { categoryInfoSchema } from './category.schema';
import { commonSchema, ynEnumSchema } from './common.schema';
import { dateTimeMessage, dateTimeRegex } from './common.schema';
import { postStatusSchema as basePostStatusSchema } from './enums.schema';
import { baseSearchSchema } from './search.schema';

// 포스트 상태 스키마 (에러 메시지 추가)
const postStatusSchema = basePostStatusSchema.refine(
  (val) => val === 'EMPTY' || val === 'WRITING' || val === 'FINISHED',
  {
    message: '올바른 포스트 상태를 입력해주세요.',
  }
);

// 카테고리 정보가 포함된 포스트 스키마
export const postSchema = commonSchema.extend({
  pstNo: z.coerce
    .number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.')
    .optional(),
  userNo: z.coerce
    .number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.'),
  ctgryNo: z.coerce
    .number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .nullable()
    .optional(),
  pstTtl: z
    .string()
    .min(
      1,
      '포스트 제목은 필수입니다.'
    )
    .max(
      255,
      '포스트 제목은 255자를 초과할 수 없습니다.'
    ),
  pstSmry: z
    .string()
    .max(
      500,
      '포스트 요약은 500자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional(),
  pstMtxt: z
    .string('포스트 본문은 문자열이어야 합니다.'),
  pstCd: z
    .string()
    .max(
      255,
      '포스트 코드는 255자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional(),
  pstThmbLink: z
    .url('올바른 URL 형식이어야 합니다.')
    .nullable()
    .optional(),
  pstView: z.coerce
    .number()
    .int('조회수는 정수여야 합니다.')
    .min(
      0,
      '조회수는 0 이상이어야 합니다.'
    )
    .default(0),
  pstStts: postStatusSchema.default('EMPTY'),
  publDt: z
    .string()
    .max(
      50,
      '발행 일시는 50자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional(),
  pinYn: ynEnumSchema.default('N'),
  rlsYn: ynEnumSchema.default('Y'),
  archYn: ynEnumSchema.default('N'),
  secrYn: ynEnumSchema
    .nullable()
    .optional(),
  pstPswd: z
    .string()
    .max(
      255,
      '게시물 비밀번호는 255자를 초과할 수 없습니다.'
    )
    .nullable()
    .optional(),
  rowNo: z.coerce
    .number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional(),
  totalCnt: z.coerce
    .number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional(),
  pstNoList: z
    .array(z.coerce
      .number()
      .int('포스트 번호는 정수여야 합니다.')
      .positive('포스트 번호는 양수여야 합니다.'))
    .optional(),
  // 카테고리 정보 포함
  category: categoryInfoSchema
    .nullable()
    .optional(),
});

// PstInfo 테이블 컬럼만 pick (Prisma 테이블 구조)
export const pstInfoTableSchema = postSchema.pick({
  pstNo: true,
  userNo: true,
  ctgryNo: true,
  pstTtl: true,
  pstSmry: true,
  pstMtxt: true,
  pstCd: true,
  pstThmbLink: true,
  pstView: true,
  pstStts: true,
  publDt: true,
  pinYn: true,
  rlsYn: true,
  archYn: true,
  secrYn: true,
  pstPswd: true,
  useYn: true,
  delYn: true,
  crtNo: true,
  crtDt: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  delDt: true,
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
    .optional(),

  // 태그/카테고리 필터
  tagNoList: z.array(z.coerce
    .number()
    .int()
    .positive())
    .optional(),
  ctgryNoList: z.array(z.coerce
    .number()
    .int()
    .positive())
    .optional(),

  // 정렬 옵션
  orderBy: z.enum([
    'LATEST',
    'POPULAR',
    'OLDEST',
  ])
    .default('LATEST'),
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
    .positive('북마크 번호는 양수여야 합니다.'),
  userNo: z.coerce
    .number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.'),
  pstNo: z.coerce
    .number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.'),
  // 포스트 정보 포함 (카테고리 정보도 포함)
  post: postSchema
    .optional(),
});

// PstBkmrkMpng 테이블 컬럼만 pick (Prisma 테이블 구조)
export const pstBkmrkMpngTableSchema = postBookmarkSchema.pick({
  bkmrkNo: true,
  userNo: true,
  pstNo: true,
  useYn: true,
  delYn: true,
  crtNo: true,
  crtDt: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  delDt: true,
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
export type PstInfoTableType = z.infer<typeof pstInfoTableSchema>;
export type CreatePostType = z.infer<typeof createPostSchema>;
export type UpdatePostType = z.infer<typeof updatePostSchema>;
export type DeletePostType = z.infer<typeof deletePostSchema>;
export type SearchPostType = z.infer<typeof searchPostSchema>;
export type CreatePostBookmarkType = z.infer<typeof createPostBookmarkSchema>;
export type DeletePostBookmarkType = z.infer<typeof deletePostBookmarkSchema>;
export type SearchPostBookmarkType = z.infer<typeof searchPostBookmarkSchema>;
export type PstBkmrkMpngTableType = z.infer<typeof pstBkmrkMpngTableSchema>;

// 포스트 조회 로그 스키마
export const postViewLogSchema = z.object({
  viewNo: z.coerce
    .number()
    .int('조회 번호는 정수여야 합니다.')
    .positive('조회 번호는 양수여야 합니다.'),
  pstNo: z.coerce
    .number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.'),
  viewerIp: z.string()
    .nullable()
    .optional(),
  viewDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    ),
});

// PstViewLog 테이블 컬럼만 pick (Prisma 테이블 구조)
export const pstViewLogTableSchema = postViewLogSchema;

// 포스트 조회 로그 생성 스키마
export const createPostViewLogSchema = z.object({
  pstNo: z.coerce
    .number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.'),
  ip: z
    .string()
    .min(
      1,
      'IP 주소는 필수입니다.'
    ),
});

// 포스트 공유 로그 스키마
export const postShareLogSchema = z.object({
  shrnNo: z.coerce
    .number()
    .int('공유 번호는 정수여야 합니다.')
    .positive('공유 번호는 양수여야 합니다.'),
  pstNo: z.coerce
    .number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.'),
  shrnSite: z.string(),
  shrnDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    ),
});

// PstShrnLog 테이블 컬럼만 pick (Prisma 테이블 구조)
export const pstShrnLogTableSchema = postShareLogSchema;

// 포스트 공유 로그 생성 스키마
export const createPostShareLogSchema = postShareLogSchema.pick({
  pstNo: true,
  shrnSite: true,
  shrnDt: true,
});

// 타입 추출
export type PostViewLogSchemaType = z.infer<typeof postViewLogSchema>;
export type PstViewLogTableType = z.infer<typeof pstViewLogTableSchema>;
export type CreatePostViewLogSchemaType = z.infer<typeof createPostViewLogSchema>;
export type PostShareLogSchemaType = z.infer<typeof postShareLogSchema>;
export type PstShrnLogTableType = z.infer<typeof pstShrnLogTableSchema>;
export type CreatePostShareLogSchemaType = z.infer<typeof createPostShareLogSchema>;
