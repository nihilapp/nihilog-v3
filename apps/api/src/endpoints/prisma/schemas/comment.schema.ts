import { z } from 'zod';

import { commonSchema } from '@/endpoints/prisma/schemas/common.schema';
import { baseSearchSchema } from '@/endpoints/prisma/schemas/search.schema';

const commentSchema = commonSchema.extend({
  cmntNo: z.coerce
    .number()
    .int('댓글 번호는 정수여야 합니다.')
    .positive('댓글 번호는 양수여야 합니다.')
    .openapi({
      description: '댓글 번호',
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
  cmntCntnt: z.string()
    .min(1, '댓글 내용은 필수입니다.')
    .max(1000, '댓글 내용은 1000자를 초과할 수 없습니다.')
    .openapi({
      description: '댓글 내용',
      example: '댓글 내용입니다.',
    }),
  cmntSts: z.enum([ 'ACTIVE', 'SPAM', 'REJECTED', ])
    .default('ACTIVE')
    .optional()
    .openapi({
      description: '댓글 상태',
      example: 'ACTIVE',
    }),
  prntCmntNo: z.coerce
    .number()
    .int('부모 댓글 번호는 정수여야 합니다.')
    .positive('부모 댓글 번호는 양수여야 합니다.')
    .optional()
    .nullable()
    .openapi({
      description: '부모 댓글 번호',
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
      example: 100,
    }),
  cmntNoList: z.array(z.coerce
    .number()
    .int('댓글 번호는 정수여야 합니다.')
    .positive('댓글 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '댓글 번호 목록',
      example: [ 1, 2, 3, ],
    }),
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
  cmntNo: true,
  cmntNoList: true,
  cmntCntnt: true,
  cmntSts: true,
  prntCmntNo: true,
  useYn: true,
  delYn: true,
});

export const deleteCommentSchema = commentSchema.pick({
  cmntNo: true,
  cmntNoList: true,
}).partial();

export const searchCommentSchema = baseSearchSchema.partial().extend({
  ...commentSchema.pick({
    cmntNo: true,
    cmntNoList: true,
    cmntSts: true,
    delYn: true,
  }).shape,
  srchType: z.enum([ 'cmntSts', ], {
    error: '검색 타입은 cmntSts 중 하나여야 합니다.',
  }).optional().openapi({
    description: '검색 타입',
    example: 'cmntSts',
  }),
}).partial();

export type CreateCommentType = z.infer<typeof createCommentSchema>;
export type UpdateCommentType = z.infer<typeof updateCommentSchema>;
export type DeleteCommentType = z.infer<typeof deleteCommentSchema>;
export type SearchCommentType = z.infer<typeof searchCommentSchema>;
