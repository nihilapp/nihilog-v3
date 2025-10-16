import { z } from 'zod';

// 공통 스키마 import
import { ynEnumSchema, baseSearchSchema } from './common.schema';

// 태그 요청 스키마들

// 태그 생성 스키마
export const createTagSchema = z.object({
  tagNm: z.string()
    .min(1, '태그명은 필수입니다.')
    .max(50, '태그명은 50자를 초과할 수 없습니다.'),
  tagExpln: z.string()
    .max(200, '태그 설명은 200자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  tagColr: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, '색상은 #RRGGBB 형식이어야 합니다.')
    .nullable()
    .optional(),
  useYn: ynEnumSchema.default('Y'),
  delYn: ynEnumSchema.default('N'),
}).partial({
  tagExpln: true,
  tagColr: true,
  useYn: true,
  delYn: true,
});

// 태그 수정 스키마
export const updateTagSchema = z.object({
  tagNo: z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional(),
  tagNm: z.string()
    .min(1, '태그명은 필수입니다.')
    .max(50, '태그명은 50자를 초과할 수 없습니다.')
    .optional(),
  tagExpln: z.string()
    .max(200, '태그 설명은 200자를 초과할 수 없습니다.')
    .nullable()
    .optional(),
  tagColr: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, '색상은 #RRGGBB 형식이어야 합니다.')
    .nullable()
    .optional(),
  useYn: ynEnumSchema.optional(),
  delYn: ynEnumSchema.optional(),
  tagNoList: z.array(z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.'))
    .optional(),
}).partial();

// 태그 삭제 스키마
export const deleteTagSchema = z.object({
  tagNo: z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional(),
  tagNoList: z.array(z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.'))
    .optional(),
}).refine((data) => data.tagNo || data.tagNoList, {
  message: '태그 번호 또는 태그 번호 목록 중 하나는 필수입니다.',
});

// 태그 검색 스키마
export const searchTagSchema = baseSearchSchema.extend({
  delYn: ynEnumSchema.optional(),
  srchMode: z.enum([
    'USER', 'ADMIN',
  ], {
    error: '검색 모드는 USER 또는 ADMIN 여야 합니다.',
  }).optional(),
  srchType: z.enum([
    'tagNm', 'tagExpln',
  ], {
    error: '검색 타입은 tagNm 또는 tagExpln 여야 합니다.',
  }).optional(),
  orderBy: z.enum([
    'LATEST', 'OLDEST', 'POPULAR', 'UNPOPULAR',
  ])
    .default('LATEST')
    .optional(),
  postCountMin: z.number()
    .int('사용 포스트 수는 정수여야 합니다.')
    .min(0, '사용 포스트 수는 0 이상이어야 합니다.')
    .optional(),
  postCountMax: z.number()
    .int('사용 포스트 수는 정수여야 합니다.')
    .min(0, '사용 포스트 수는 0 이상이어야 합니다.')
    .optional(),
  subscriberCountMin: z.number()
    .int('구독자 수는 정수여야 합니다.')
    .min(0, '구독자 수는 0 이상이어야 합니다.')
    .optional(),
  subscriberCountMax: z.number()
    .int('구독자 수는 정수여야 합니다.')
    .min(0, '구독자 수는 0 이상이어야 합니다.')
    .optional(),
}).partial();

// 포스트-태그 매핑 생성 스키마
export const createPstTagMpngSchema = z.object({
  pstNo: z.number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.'),
  tagNo: z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.'),
  useYn: ynEnumSchema.default('Y'),
  delYn: ynEnumSchema.default('N'),
}).partial({
  useYn: true,
  delYn: true,
});

// 포스트-태그 매핑 수정 스키마
export const updatePstTagMpngSchema = z.object({
  tagMapNo: z.number()
    .int('태그 매핑 번호는 정수여야 합니다.')
    .positive('태그 매핑 번호는 양수여야 합니다.')
    .optional(),
  pstNo: z.number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.')
    .optional(),
  tagNo: z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional(),
  useYn: ynEnumSchema.optional(),
  delYn: ynEnumSchema.optional(),
  tagMapNoList: z.array(z.number()
    .int('태그 매핑 번호는 정수여야 합니다.')
    .positive('태그 매핑 번호는 양수여야 합니다.'))
    .optional(),
}).partial();

// 포스트-태그 매핑 삭제 스키마
export const deletePstTagMpngSchema = z.object({
  tagMapNo: z.number()
    .int('태그 매핑 번호는 정수여야 합니다.')
    .positive('태그 매핑 번호는 양수여야 합니다.')
    .optional(),
  tagMapNoList: z.array(z.number()
    .int('태그 매핑 번호는 정수여야 합니다.')
    .positive('태그 매핑 번호는 양수여야 합니다.'))
    .optional(),
}).refine((data) => data.tagMapNo || data.tagMapNoList, {
  message: '태그 매핑 번호 또는 태그 매핑 번호 목록 중 하나는 필수입니다.',
});

// 포스트-태그 매핑 검색 스키마
export const searchPstTagMpngSchema = baseSearchSchema.extend({
  pstNo: z.number()
    .int('포스트 번호는 정수여야 합니다.')
    .positive('포스트 번호는 양수여야 합니다.')
    .optional(),
  tagNo: z.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional(),
  useYn: ynEnumSchema.optional(),
  delYn: ynEnumSchema.optional(),
  srchType: z.enum([
    'pstNo', 'tagNo',
  ], {
    error: '검색 타입은 pstNo 또는 tagNo 여야 합니다.',
  }).optional(),
  orderBy: z.enum([
    'LATEST', 'OLDEST',
  ])
    .default('LATEST')
    .optional(),
}).partial();

// 타입 추출
export type CreateTagType = z.infer<typeof createTagSchema>;
export type UpdateTagType = z.infer<typeof updateTagSchema>;
export type DeleteTagType = z.infer<typeof deleteTagSchema>;
export type SearchTagType = z.infer<typeof searchTagSchema>;
export type CreatePstTagMpngType = z.infer<typeof createPstTagMpngSchema>;
export type UpdatePstTagMpngType = z.infer<typeof updatePstTagMpngSchema>;
export type DeletePstTagMpngType = z.infer<typeof deletePstTagMpngSchema>;
export type SearchPstTagMpngType = z.infer<typeof searchPstTagMpngSchema>;
