import { z } from 'zod';

// 공통 스키마 import
import { ynEnumSchema, baseSearchSchema } from './common.schema.js';

// 태그 구독 요청 스키마들

// 태그 구독 생성 스키마
export const createTagSubscribeSchema = z.object({
  sbcrNo: z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.'),
  tagNo: z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.'),
  useYn: ynEnumSchema.default('Y'),
  delYn: ynEnumSchema.default('N'),
  tagNoList: z.array(z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.'))
    .optional(),
}).partial({
  tagNoList: true,
});

// 태그 구독 수정 스키마
export const updateTagSubscribeSchema = z.object({
  tagSbcrNo: z.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.')
    .optional(),
  sbcrNo: z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
  tagNo: z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional(),
  useYn: ynEnumSchema.optional(),
  delYn: ynEnumSchema.optional(),
  tagNoList: z.array(z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.'))
    .optional(),
  tagSbcrNoList: z.array(z.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.'))
    .optional(),
}).partial();

// 태그 구독 삭제 스키마
export const deleteTagSubscribeSchema = z.object({
  tagSbcrNoList: z.array(z.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.'))
    .optional(),
  tagSbcrNo: z.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.')
    .optional(),
  sbcrNo: z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
}).partial();

// 태그 구독 검색 스키마
export const searchTagSubscribeSchema = baseSearchSchema.extend({
  delYn: ynEnumSchema.optional(),
  useYn: ynEnumSchema.optional(),
  tagNo: z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional(),
  sbcrNo: z.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
  srchType: z.enum([
    'tagNm', 'userNm', 'tagExpln',
  ], {
    error: '검색 타입은 tagNm, userNm 중 하나여야 합니다.',
  }).optional(),
  crtDtFrom: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.')
    .optional(),
  crtDtTo: z.string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'YYYY-MM-DD HH:MM:SS 형식이어야 합니다.')
    .optional(),
  orderBy: z.enum([
    'TAG_SBCR_LATEST', 'TAG_SBCR_OLDEST', 'TAG_NAME_ASC', 'TAG_NAME_DESC', 'USER_NAME_ASC', 'USER_NAME_DESC',
  ])
    .default('TAG_SBCR_LATEST')
    .optional(),
}).partial();

// 타입 추출
export type CreateTagSubscribeType = z.infer<typeof createTagSubscribeSchema>;
export type UpdateTagSubscribeType = z.infer<typeof updateTagSubscribeSchema>;
export type DeleteTagSubscribeType = z.infer<typeof deleteTagSubscribeSchema>;
export type SearchTagSubscribeType = z.infer<typeof searchTagSubscribeSchema>;
