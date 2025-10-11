import { z } from 'zod';

// 공통 스키마 import
import { ynEnumSchema, baseSearchSchema } from './common.schema.js';

// 댓글 요청 스키마들

// 댓글 생성 스키마
export const createCommentSchema = z.object({
  pstNo: z.number()
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.'),
  cmntCntnt: z.string()
    .min(1, '댓글 내용은 필수입니다.')
    .max(1000, '댓글 내용은 1000자를 초과할 수 없습니다.'),
  cmntSts: z.enum([
    'PENDING', 'APPROVED', 'SPAM', 'REJECTED',
  ])
    .default('PENDING')
    .optional(),
  prntCmntNo: z.number()
    .int('부모 댓글 번호는 정수여야 합니다.')
    .positive('부모 댓글 번호는 양수여야 합니다.')
    .optional()
    .nullable(),
  useYn: ynEnumSchema.default('Y'),
  delYn: ynEnumSchema.default('N'),
}).partial({
  cmntSts: true,
  prntCmntNo: true,
  useYn: true,
  delYn: true,
});

// 댓글 수정 스키마
export const updateCommentSchema = z.object({
  cmntNo: z.number()
    .int('댓글 번호는 정수여야 합니다.')
    .positive('댓글 번호는 양수여야 합니다.')
    .optional(),
  cmntNoList: z.array(z.number()
    .int('댓글 번호는 정수여야 합니다.')
    .positive('댓글 번호는 양수여야 합니다.'))
    .optional(),
  cmntCntnt: z.string()
    .min(1, '댓글 내용은 필수입니다.')
    .max(1000, '댓글 내용은 1000자를 초과할 수 없습니다.')
    .optional(),
  cmntSts: z.enum([
    'PENDING', 'APPROVED', 'SPAM', 'REJECTED',
  ])
    .optional(),
  prntCmntNo: z.number()
    .int('부모 댓글 번호는 정수여야 합니다.')
    .positive('부모 댓글 번호는 양수여야 합니다.')
    .optional()
    .nullable(),
  useYn: ynEnumSchema.optional(),
  delYn: ynEnumSchema.optional(),
}).partial();

// 댓글 삭제 스키마
export const deleteCommentSchema = z.object({
  cmntNo: z.number()
    .int('댓글 번호는 정수여야 합니다.')
    .positive('댓글 번호는 양수여야 합니다.')
    .optional(),
  cmntNoList: z.array(z.number()
    .int('댓글 번호는 정수여야 합니다.')
    .positive('댓글 번호는 양수여야 합니다.'))
    .optional(),
}).partial();

// 댓글 검색 스키마
export const searchCommentSchema = baseSearchSchema.extend({
  pstNo: z.number()
    .int('게시글 번호는 정수여야 합니다.')
    .positive('게시글 번호는 양수여야 합니다.')
    .optional(),
  cmntNo: z.number()
    .int('댓글 번호는 정수여야 합니다.')
    .positive('댓글 번호는 양수여야 합니다.')
    .optional(),
  cmntNoList: z.array(z.number()
    .int('댓글 번호는 정수여야 합니다.')
    .positive('댓글 번호는 양수여야 합니다.'))
    .optional(),
  cmntSts: z.enum([
    'PENDING', 'APPROVED', 'SPAM', 'REJECTED',
  ])
    .optional(),
  delYn: ynEnumSchema.optional(),
  useYn: ynEnumSchema.optional(),
  srchType: z.enum([
    'userEmlAddr', 'cmntCntnt', 'userNm',
  ], {
    error: '검색 타입은 userEmlAddr, cmntCntnt, userNm 중 하나여야 합니다.',
  })
    .default('userEmlAddr')
    .optional(),
  crtDtFrom: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.')
    .optional(),
  crtDtTo: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.')
    .optional(),
  orderBy: z.enum([
    'LATEST', 'OLDEST',
  ], {
    error: '정렬 옵션은 LATEST, OLDEST 중 하나여야 합니다.',
  })
    .default('LATEST')
    .optional(),
}).partial();

// 타입 추출
export type CreateCommentType = z.infer<typeof createCommentSchema>;
export type UpdateCommentType = z.infer<typeof updateCommentSchema>;
export type DeleteCommentType = z.infer<typeof deleteCommentSchema>;
export type SearchCommentType = z.infer<typeof searchCommentSchema>;
