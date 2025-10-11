import { z } from 'zod';

// 공통 스키마 import
import { ynEnumSchema, postStatusSchema, baseSearchSchema } from './common.schema.js';

// 게시글 요청 스키마들

// 게시글 생성 스키마
export const createPostSchema = z.object({
  pstTtl: z.string()
    .min(1, '게시글 제목은 필수입니다.')
    .max(255, '게시글 제목은 255자를 초과할 수 없습니다.'),
  pstSmry: z.string()
    .max(500, '게시글 요약은 500자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  pstMtxt: z.string('게시글 본문은 문자열이어야 합니다.'),
  pstCd: z.string()
    .max(255, '게시글 코드는 255자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  pstThmbLink: z.url('올바른 URL 형식이어야 합니다.')
    .nullable()
    .optional(),
  pstStts: postStatusSchema.default('EMPTY'),
  publDt: z.string()
    .max(50, '발행 일시는 50자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  pinYn: ynEnumSchema.default('N'),
  rlsYn: ynEnumSchema.default('Y'),
  archYn: ynEnumSchema.default('N'),
  secrYn: ynEnumSchema
    .nullable()
    .optional(),
  pstPswd: z.string()
    .max(255, '게시물 비밀번호는 255자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  ctgryNo: z.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .nullable()
    .optional(),
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
});

// 게시글 수정 스키마
export const updatePostSchema = z.object({
  pstNo: z.number()
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.')
    .optional(),
  pstTtl: z.string()
    .min(1, '게시글 제목은 필수입니다.')
    .max(255, '게시글 제목은 255자를 초과할 수 없습니다.')
    .optional(),
  pstSmry: z.string()
    .max(500, '게시글 요약은 500자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  pstMtxt: z.string('게시글 본문은 문자열이어야 합니다.')
    .optional(),
  pstCd: z.string()
    .max(255, '게시글 코드는 255자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  pstThmbLink: z.url('올바른 URL 형식이어야 합니다.')
    .nullable()
    .optional(),
  pstStts: postStatusSchema.optional(),
  publDt: z.string()
    .max(50, '발행 일시는 50자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  pinYn: ynEnumSchema.optional(),
  rlsYn: ynEnumSchema.optional(),
  archYn: ynEnumSchema.optional(),
  secrYn: ynEnumSchema
    .nullable()
    .optional(),
  pstPswd: z.string()
    .max(255, '게시물 비밀번호는 255자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  ctgryNo: z.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .nullable()
    .optional(),
  pstNoList: z.array(z.number()
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.'))
    .optional(),
}).partial();

// 게시글 삭제 스키마
export const deletePostSchema = z.object({
  pstNo: z.number()
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.')
    .optional(),
  pstNoList: z.array(z.number()
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.'))
    .optional(),
}).refine((data) => data.pstNo || data.pstNoList, {
  message: '게시글 번호 또는 게시글 번호 목록 중 하나는 필수입니다.',
});

// 게시글 검색 스키마
export const searchPostSchema = baseSearchSchema.extend({
  delYn: ynEnumSchema.optional(),
  pstStts: postStatusSchema.optional(),
  rlsYn: ynEnumSchema.optional(),
  archYn: ynEnumSchema.optional(),
  srchType: z.enum([
    'pstTtl', 'pstSmry',
  ], {
    error: '검색 타입은 pstTtl 또는 pstSmry 여야 합니다.',
  }).optional(),
  // 태그/카테고리 필터
  tagNoList: z.array(z.number()
    .int()
    .positive())
    .optional(),
  ctgryNoList: z.array(z.number()
    .int()
    .positive())
    .optional(),
  // 정렬 옵션
  orderBy: z.enum([
    'LATEST', 'POPULAR', 'OLDEST',
  ])
    .default('LATEST')
    .optional(),
}).partial();

// 게시글 북마크 생성 스키마
export const createPostBookmarkSchema = z.object({
  userNo: z.number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.'),
  pstNo: z.number()
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.'),
});

// 게시글 북마크 삭제 스키마
export const deletePostBookmarkSchema = z.object({
  bkmrkNo: z.number()
    .int('북마크 번호는 정수여야 합니다.')
    .positive('북마크 번호는 양수여야 합니다.'),
});

// 타입 추출
export type CreatePostType = z.infer<typeof createPostSchema>;
export type UpdatePostType = z.infer<typeof updatePostSchema>;
export type DeletePostType = z.infer<typeof deletePostSchema>;
export type SearchPostType = z.infer<typeof searchPostSchema>;
export type CreatePostBookmarkType = z.infer<typeof createPostBookmarkSchema>;
export type DeletePostBookmarkType = z.infer<typeof deletePostBookmarkSchema>;
