import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex } from './common.schema';
import { baseSearchSchema } from './search.schema';

const commentSchema = commonSchema.extend({
  cmntNo: z.coerce
    .number()
    .int('댓글 번호는 정수여야 합니다.')
    .positive('댓글 번호는 양수여야 합니다.'),
  pstNo: z.coerce
    .number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.'),
  cmntCntnt: z.string()
    .min(
      1,
      '댓글 내용은 필수입니다.'
    )
    .max(
      1000,
      '댓글 내용은 1000자를 초과할 수 없습니다.'
    ),
  cmntSts: z.enum([
    'PENDING',
    'APPROVED',
    'SPAM',
    'REJECTED',
  ])
    .default('PENDING')
    .optional(),
  prntCmntNo: z.coerce
    .number()
    .int('부모 댓글 번호는 정수여야 합니다.')
    .positive('부모 댓글 번호는 양수여야 합니다.')
    .optional()
    .nullable(),
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
  cmntNoList: z.array(z.coerce
    .number()
    .int('댓글 번호는 정수여야 합니다.')
    .positive('댓글 번호는 양수여야 합니다.'))
    .optional(),
});

// CmntInfo 테이블 컬럼만 pick (Prisma 테이블 구조)
export const cmntInfoTableSchema = commentSchema.pick({
  cmntNo: true,
  pstNo: true,
  cmntCntnt: true,
  cmntSts: true,
  prntCmntNo: true,
  useYn: true,
  delYn: true,
  crtNo: true,
  crtDt: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  delDt: true,
});

export const createCommentSchema = commentSchema.pick({
  pstNo: true,
  cmntCntnt: true,
  cmntSts: true,
  prntCmntNo: true,
  useYn: true,
  delYn: true,
}).partial({
  cmntSts: true,
  prntCmntNo: true,
  useYn: true,
  delYn: true,
});

export const updateCommentSchema = commentSchema.partial().pick({
  cmntNoList: true,
  cmntCntnt: true,
  cmntSts: true,
  prntCmntNo: true,
  useYn: true,
  delYn: true,
});

export const deleteCommentSchema = commentSchema.pick({
  cmntNoList: true,
}).partial();

export const searchCommentSchema = baseSearchSchema.partial().extend({
  ...commentSchema.pick({
    pstNo: true,
    cmntNo: true,
    cmntNoList: true,
    cmntSts: true,
    delYn: true,
    useYn: true,
  }).shape,
  srchType: z.enum(
    [
      'userEmlAddr',
      'cmntCntnt',
      'userNm',
    ],
    {
      error: '검색 타입은 userEmlAddr, cmntCntnt, userNm 중 하나여야 합니다.',
    }
  )
    .default('userEmlAddr')
    .optional(),
  crtDtFrom: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional(),
  crtDtTo: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional(),
  orderBy: z.enum(
    [
      'LATEST',
      'OLDEST',
    ],
    {
      error: '정렬 옵션은 LATEST, OLDEST 중 하나여야 합니다.',
    }
  )
    .default('LATEST')
    .optional(),
}).partial();

export type CmntInfoTableType = z.infer<typeof cmntInfoTableSchema>;
export type CreateCommentType = z.infer<typeof createCommentSchema>;
export type UpdateCommentType = z.infer<typeof updateCommentSchema>;
export type DeleteCommentType = z.infer<typeof deleteCommentSchema>;
export type SearchCommentType = z.infer<typeof searchCommentSchema>;
