import { z } from 'zod';

import { commonSchema } from '@/endpoints/prisma/schemas/common.schema';
import { baseSearchSchema } from '@/endpoints/prisma/schemas/search.schema';

export const tagSubscribeSchema = commonSchema.extend({
  tagSbcrNo: z.coerce.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '태그 구독 번호',
      example: 1,
    }),
  sbcrNo: z.coerce.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '구독 번호',
      example: 1,
    }),
  tagNo: z.coerce.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '태그 번호',
      example: 1,
    }),
  tagNm: z.string()
    .max(100, '태그 이름은 100자 이하여야 합니다.')
    .optional()
    .openapi({
      description: '태그 이름',
      example: 'JavaScript',
    }),
  rowNo: z.coerce.number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '행 번호',
      example: 1,
    }),
  totalCnt: z.coerce.number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional()
    .openapi({
      description: '총 개수',
      example: 10,
    }),
  tagNoList: z.array(z.coerce.number()
    .int('태그 번호는 정수여야 합니다.')
    .positive('태그 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '태그 번호 목록',
      example: [ 1, 2, 3, ],
    }),
  tagSbcrNoList: z.array(z.coerce.number()
    .int('태그 구독 번호는 정수여야 합니다.')
    .positive('태그 구독 번호는 양수여야 합니다.'))
    .optional()
    .openapi({
      description: '태그 구독 번호 목록',
      example: [ 1, 2, 3, ],
    }),
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
  tagSbcrNo: true,
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
  tagSbcrNo: true,
  sbcrNo: true,
}).partial();

// 태그 구독 검색용 스키마
export const searchTagSubscribeSchema = baseSearchSchema.extend({
  ...tagSubscribeSchema.pick({
    delYn: true,
  }).shape,
  srchType: z.enum([ 'tagNm', 'userNm', ], {
    error: '검색 타입은 tagNm, userNm 중 하나여야 합니다.',
  }).optional().openapi({
    description: '검색 타입 (tagNm, userNm)',
    example: 'tagNm',
  }),
}).partial();

export type TagSubscribeType = z.infer<typeof tagSubscribeSchema>;
export type TagSubscribeInfoType = Partial<TagSubscribeType>;
export type TagSubscribeItemListType = z.infer<typeof tagSubscribeItemListSchema>;
export type CreateTagSubscribeType = z.infer<typeof createTagSubscribeSchema>;
export type UpdateTagSubscribeType = z.infer<typeof updateTagSubscribeSchema>;
export type DeleteTagSubscribeType = z.infer<typeof deleteTagSubscribeSchema>;
export type SearchTagSubscribeType = z.infer<typeof searchTagSubscribeSchema>;
