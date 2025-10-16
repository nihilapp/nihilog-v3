import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex } from '@/endpoints/prisma/schemas/common.schema';
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
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.')
    .openapi({
      description: '포스트 번호',
      example: 1,
    }),
  cmntCntnt: z.string()
    .min(1, '댓글 내용은 필수입니다.')
    .max(1000, '댓글 내용은 1000자를 초과할 수 없습니다.')
    .openapi({
      description: '댓글 내용',
      example: '댓글 내용입니다.',
    }),
  cmntSts: z.enum([ 'PENDING', 'APPROVED', 'SPAM', 'REJECTED', ])
    .default('PENDING')
    .optional()
    .openapi({
      description: '댓글 상태',
      example: 'PENDING',
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
    pstNo: true,
    cmntNo: true,
    cmntNoList: true,
    cmntSts: true,
    delYn: true,
    useYn: true,
  }).shape,
  srchType: z.enum([ 'userEmlAddr', 'cmntCntnt', 'userNm', ], {
    error: '검색 타입은 userEmlAddr, cmntCntnt, userNm 중 하나여야 합니다.',
  })
    .default('userEmlAddr')
    .optional()
    .openapi({
      description: '검색 타입 (userEmlAddr: 사용자 이메일 주소, cmntCntnt: 댓글 내용, userNm: 사용자 이름)',
      example: 'userEmlAddr',
    }),
  crtDtFrom: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .optional()
    .openapi({
      description: '생성 날짜 시작 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
  crtDtTo: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .optional()
    .openapi({
      description: '생성 날짜 끝 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-12-31 23:59:59',
    }),
  orderBy: z.enum([ 'LATEST', 'OLDEST', ], {
    error: '정렬 옵션은 LATEST, OLDEST 중 하나여야 합니다.',
  })
    .default('LATEST')
    .optional()
    .openapi({
      description: '정렬 옵션 (LATEST: 최신순, OLDEST: 오래된순)',
      example: 'LATEST',
    }),
}).partial();

export type CreateCommentType = z.infer<typeof createCommentSchema>;
export type UpdateCommentType = z.infer<typeof updateCommentSchema>;
export type DeleteCommentType = z.infer<typeof deleteCommentSchema>;
export type SearchCommentType = z.infer<typeof searchCommentSchema>;
