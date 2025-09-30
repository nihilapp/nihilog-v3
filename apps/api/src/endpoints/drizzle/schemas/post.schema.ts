import { z } from 'zod';

import { postStatus } from '@/endpoints/drizzle/enums/post-status.enum';
import { commonSchema, ynEnumSchema } from '@/endpoints/drizzle/schemas/common.schema';
import { baseSearchSchema } from '@/endpoints/drizzle/schemas/search.schema';

// 게시글 상태 enum을 Zod 스키마로 변환
const postStatusSchema = z.enum(postStatus.enumValues, '올바른 게시글 상태를 입력해주세요.');

// 기본 게시글 스키마
export const postSchema = commonSchema.extend({
  pstNo: z.coerce.number()
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.')
    .optional(),
  userNo: z.coerce.number()
    .int('사용자 번호는 정수여야 합니다.')
    .positive('사용자 번호는 양수여야 합니다.'),
  ctgryNo: z.coerce.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .nullable()
    .optional(),
  pstTtl: z.string()
    .min(1, '게시글 제목은 필수입니다.')
    .max(255, '게시글 제목은 255자를 초과할 수 없습니다.'),
  pstSmry: z.string()
    .max(500, '게시글 요약은 500자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  pstMtxt: z.record(z.string(), z.any(), '게시글 본문은 JSON 형태여야 합니다.'),
  pstCd: z.string()
    .max(255, '게시글 코드는 255자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  pstThmbLink: z.url('올바른 URL 형식이어야 합니다.')
    .nullable()
    .optional(),
  pstView: z.coerce.number()
    .int('조회수는 정수여야 합니다.')
    .min(0, '조회수는 0 이상이어야 합니다.')
    .default(0),
  pstStts: postStatusSchema
    .default('EMPTY'),
  publDt: z.string()
    .max(50, '발행 일시는 50자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  rlsYn: ynEnumSchema
    .default('Y'),
  archYn: ynEnumSchema
    .default('N'),
  secrYn: ynEnumSchema
    .nullable()
    .optional(),
  pstPswd: z.string()
    .max(255, '게시물 비밀번호는 255자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  rowNo: z.coerce.number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional(),
  totalCnt: z.coerce.number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional(),
  pstNoList: z.array(z.coerce.number()
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.'))
    .optional(),
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
  ...postSchema.shape,
  srchType: z.enum([ 'pstTtl', 'pstSmry', 'pstMtxt', ], {
    error: '검색 타입은 pstTtl, pstSmry, pstMtxt 중 하나여야 합니다.',
  }).optional(),
}).partial();

// 게시글 삭제 스키마 (포스트 번호 또는 리스트 선택)
export const deletePostSchema = postSchema.pick({
  pstNo: true,
  pstNoList: true,
}).refine((data) => data.pstNo || data.pstNoList, {
  message: '게시글 번호 또는 게시글 번호 목록 중 하나는 필수입니다.',
});

// 타입 추출
export type PostType = z.infer<typeof postSchema>;
export type PostInfoType = Partial<PostType>;
export type CreatePostType = z.infer<typeof createPostSchema>;
export type UpdatePostType = z.infer<typeof updatePostSchema>;
export type DeletePostType = z.infer<typeof deletePostSchema>;
export type SearchPostType = z.infer<typeof searchPostSchema>;
