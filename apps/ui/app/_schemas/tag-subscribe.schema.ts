import { z } from 'zod';

import { commonSchema, dateTimeMessage, dateTimeRegex } from './common.schema';
import { baseSearchSchema } from './search.schema';

export const tagSubscribeSchema = commonSchema.extend({
  tagSbcrNo: z.coerce.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.')
    .optional(),
  sbcrNo: z.coerce.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
  tagNo: z.coerce.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional(),
  tagNm: z.string()
    .max(
      100,
      '태그 이름은 100자 이하여야 합니다.'
    )
    .optional(),
  rowNo: z.coerce.number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional(),
  totalCnt: z.coerce.number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional(),
  tagNoList: z.array(z.coerce.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.'))
    .optional(),
  tagSbcrNoList: z.array(z.coerce.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.'))
    .optional(),
});

// TagSbcrMpng 테이블 컬럼만 pick (Prisma 테이블 구조)
export const tagSbcrMpngTableSchema = tagSubscribeSchema.pick({
  tagSbcrNo: true,
  sbcrNo: true,
  tagNo: true,
  useYn: true,
  delYn: true,
  crtNo: true,
  crtDt: true,
  updtNo: true,
  updtDt: true,
  delNo: true,
  delDt: true,
});

export const tagSubscribeItemListSchema = tagSubscribeSchema.pick({
  tagNo: true,
  tagNm: true,
});

// 태그 구독 생성용 스키마
export const createTagSubscribeSchema = tagSubscribeSchema.pick({
  sbcrNo: true,
  tagNo: true,
  useYn: true,
  delYn: true,
  tagNoList: true,
}).partial({
  tagNoList: true,
});

// 태그 구독 수정용 스키마
export const updateTagSubscribeSchema = tagSubscribeSchema.pick({
  sbcrNo: true,
  tagNo: true,
  useYn: true,
  delYn: true,
  tagNoList: true,
  tagSbcrNoList: true,
}).partial();

// 태그 구독 삭제용 스키마
export const deleteTagSubscribeSchema = tagSubscribeSchema.pick({
  tagSbcrNoList: true,
  sbcrNo: true,
}).partial();

// 태그 구독 검색용 스키마
export const searchTagSubscribeSchema = baseSearchSchema.extend({
  ...tagSubscribeSchema.pick({
    delYn: true,
    useYn: true,
    tagNo: true,
    sbcrNo: true,
  }).shape,
  srchType: z.enum(
    [
      'tagNm',
      'userNm',
      'tagExpln',
    ],
    {
      error: '검색 타입은 tagNm, userNm 중 하나여야 합니다.',
    }
  ).optional(),
  crtDtFrom: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional(),
  crtDtTo: z.string()
    .regex(
      dateTimeRegex,
      dateTimeMessage
    )
    .optional(),
  orderBy: z.enum([
    'TAG_SBCR_LATEST',
    'TAG_SBCR_OLDEST',
    'TAG_NAME_ASC',
    'TAG_NAME_DESC',
    'USER_NAME_ASC',
    'USER_NAME_DESC',
  ])
    .default('TAG_SBCR_LATEST')
    .optional(),
}).partial();

export type TagSubscribeType = z.infer<typeof tagSubscribeSchema>;
export type TagSubscribeInfoType = Partial<TagSubscribeType>;
export type TagSbcrMpngTableType = z.infer<typeof tagSbcrMpngTableSchema>;
export type TagSubscribeItemListType = z.infer<typeof tagSubscribeItemListSchema>;
export type CreateTagSubscribeType = z.infer<typeof createTagSubscribeSchema>;
export type UpdateTagSubscribeType = z.infer<typeof updateTagSubscribeSchema>;
export type DeleteTagSubscribeType = z.infer<typeof deleteTagSubscribeSchema>;
export type SearchTagSubscribeType = z.infer<typeof searchTagSubscribeSchema>;
