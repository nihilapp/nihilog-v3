import { z } from 'zod';

import { dateTimeMessage, dateTimeRegex } from '@/endpoints/prisma/schemas/common.schema';

export const postViewLogSchema = z.object({
  viewNo: z.coerce
    .number()
    .int('조회 번호는 정수여야 합니다.')
    .positive('조회 번호는 양수여야 합니다.')
    .openapi({
      description: '조회 번호',
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
  viewerIp: z.string()
    .nullable()
    .optional()
    .openapi({
      description: '조회자 IP',
      example: '127.0.0.1',
    }),
  viewDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .openapi({
      description: '조회 일시 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
});

export type PostViewLogSchemaType = z.infer<typeof postViewLogSchema>;
