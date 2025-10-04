import { z } from 'zod';

import { commonSchema } from '@/endpoints/prisma/schemas/common.schema';
import { baseSearchSchema } from '@/endpoints/prisma/schemas/search.schema';

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
  rowNo: z.coerce
    .number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .openapi({
      description: '행 번호',
      example: 1,
    }),
  totalCnt: z.coerce
    .number()
    .int('총 건수는 정수여야 합니다.')
    .positive('총 건수는 양수여야 합니다.')
    .openapi({
      description: '총 건수',
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

export const searchPostBookmarkSchema = postBookmarkSchema.pick({
  delYn: true,
}).extend(baseSearchSchema.omit({
  srchType: true,
  srchKywd: true,
}).shape).partial();

export type CreatePostBookmarkSchemaType = z.infer<typeof createPostBookmarkSchema>;
export type DeletePostBookmarkSchemaType = z.infer<typeof deletePostBookmarkSchema>;
export type SearchPostBookmarkSchemaType = z.infer<typeof searchPostBookmarkSchema>;
