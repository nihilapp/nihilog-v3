import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { ynSchema } from '@/endpoints/prisma/schemas/enums.schema';

// Zod에 OpenAPI 확장 적용
extendZodWithOpenApi(z);

export const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
export const dateTimeMessage = 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.';

// Y/N enum 스키마 (에러 메시지 추가)
export const ynEnumSchema = ynSchema.refine((val) => val === 'Y' || val === 'N', {
  message: 'Y 또는 N 값을 입력해주세요.',
});

// 타입 추출
export type YnType = z.infer<typeof ynEnumSchema>;

export const commonSchema = z.object({
  useYn: ynEnumSchema
    .default('Y')
    .openapi({
      description: '사용 여부',
      example: 'Y',
    }),
  delYn: ynEnumSchema
    .default('N')
    .openapi({
      description: '삭제 여부',
      example: 'N',
    }),
  crtNo: z.coerce.number()
    .int('생성자 번호는 정수여야 합니다.')
    .nullable()
    .optional()
    .openapi({
      description: '생성자 번호',
      example: 1,
    }),
  crtDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional()
    .openapi({
      description: '생성 날짜 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
  updtNo: z.coerce.number()
    .int('수정자 번호는 정수여야 합니다.')
    .nullable()
    .optional()
    .openapi({
      description: '수정자 번호',
      example: 1,
    }),
  updtDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional()
    .openapi({
      description: '수정 날짜 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
  delNo: z.coerce.number()
    .int('삭제자 번호는 정수여야 합니다.')
    .nullable()
    .optional()
    .openapi({
      description: '삭제자 번호',
      example: 1,
    }),
  delDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional()
    .openapi({
      description: '삭제 날짜 (YYYY-MM-DD HH:MM:SS)',
      example: '2024-01-01 00:00:00',
    }),
});
