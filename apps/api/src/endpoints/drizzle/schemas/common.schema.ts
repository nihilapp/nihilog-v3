import { z } from 'zod';

import { yn } from '@/endpoints/drizzle/enums';

export const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
export const dateTimeMessage = 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.';

// Drizzle enum을 Zod 스키마로 변환
export const ynEnumSchema = z.enum(yn.enumValues, 'Y 또는 N 값을 입력해주세요.');

// 타입 추출
export type YnType = z.infer<typeof ynEnumSchema>;

export const commonSchema = z.object({
  useYn: ynEnumSchema
    .default('Y'),
  delYn: ynEnumSchema
    .default('N'),
  crtNo: z.coerce.number()
    .int('생성자 번호는 정수여야 합니다.')
    .nullable()
    .optional(),
  crtDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional(),
  updtNo: z.coerce.number()
    .int('수정자 번호는 정수여야 합니다.')
    .nullable()
    .optional(),
  updtDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional(),
  delNo: z.coerce.number()
    .int('삭제자 번호는 정수여야 합니다.')
    .nullable()
    .optional(),
  delDt: z.string()
    .regex(dateTimeRegex, dateTimeMessage)
    .nullable()
    .optional(),
});
