import { z } from 'zod';

import { ynSchema } from './enums.schema';

export const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
export const dateTimeMessage = 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.';

// Y/N enum 스키마 (에러 메시지 추가)
export const ynEnumSchema = ynSchema.refine(
  (val) => val === 'Y' || val === 'N',
  {
    message: 'Y 또는 N 값을 입력해주세요.',
  }
);

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
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .nullable()
    .optional(),
  updtNo: z.coerce.number()
    .int('수정자 번호는 정수여야 합니다.')
    .nullable()
    .optional(),
  updtDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .nullable()
    .optional(),
  delNo: z.coerce.number()
    .int('삭제자 번호는 정수여야 합니다.')
    .nullable()
    .optional(),
  delDt: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .nullable()
    .optional(),
});

// 포스트 조회수 통계 스키마
export const analyzeStatSchema = z.object({
  mode: z.enum([
    'day',
    'week',
    'month',
    'year',
  ])
    .default('day'),
  startDt: z.string(),
  endDt: z.string(),
  limit: z.coerce.number()
    .int('제한 수는 정수여야 합니다.')
    .min(
      1,
      '제한 수는 1 이상이어야 합니다.'
    )
    .max(
      1000,
      '제한 수는 1000 이하여야 합니다.'
    )
    .optional(),
});

// 타입 추출
export type AnalyzeStatType = z.infer<typeof analyzeStatSchema>;
