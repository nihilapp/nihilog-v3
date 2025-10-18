import { z } from 'zod';

import { dateTimeMessage, dateTimeRegex } from '@/endpoints/prisma/schemas/common.schema';

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

export const createPostShareLogSchema = postShareLogSchema.pick({
  pstNo: true,
  shrnSite: true,
  shrnDt: true,
});

export type PostShareLogSchemaType = z.infer<typeof postShareLogSchema>;
export type CreatePostShareLogSchemaType = z.infer<typeof createPostShareLogSchema>;
