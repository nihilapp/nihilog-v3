import { z } from 'zod';

import { commonSchema } from '@/endpoints/drizzle/schemas/common.schema';

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
    .max(100, '태그 이름은 100자 이하여야 합니다.')
    .optional(),
  rowNo: z.coerce.number()
    .int('행 번호는 정수여야 합니다.')
    .positive('행 번호는 양수여야 합니다.')
    .optional(),
  totalCnt: z.coerce.number()
    .int('총 개수는 정수여야 합니다.')
    .positive('총 개수는 양수여야 합니다.')
    .optional(),
});

export const tagSubscribeItemListSchema = tagSubscribeSchema.pick({
  tagNo: true,
  tagNm: true,
});

export type TagSubscribeType = z.infer<typeof tagSubscribeSchema>;
export type TagSubscribeInfoType = Partial<TagSubscribeType>;

export type TagSubscribeItemListType = z.infer<typeof tagSubscribeItemListSchema>;
