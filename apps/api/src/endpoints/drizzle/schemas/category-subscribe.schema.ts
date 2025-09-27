import { z } from 'zod';

import { commonSchema } from '@/endpoints/drizzle/schemas/common.schema';

export const categorySubscribeSchema = commonSchema.extend({
  ctgrySbcrNo: z.coerce.number()
    .int('구독 카테고리 번호는 정수여야 합니다.')
    .positive('구독 카테고리 번호는 양수여야 합니다.')
    .optional(),
  sbcrNo: z.coerce.number()
    .int('구독 번호는 정수여야 합니다.')
    .positive('구독 번호는 양수여야 합니다.')
    .optional(),
  ctgryNo: z.coerce.number()
    .int('카테고리 번호는 정수여야 합니다.')
    .positive('카테고리 번호는 양수여야 합니다.')
    .optional(),
  ctgryNm: z.string()
    .max(100, '카테고리 이름은 100자 이하여야 합니다.')
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

export const categorySubscribeItemListSchema = categorySubscribeSchema.pick({
  ctgryNo: true,
  ctgryNm: true,
});

export type CategorySubscribeType = z.infer<typeof categorySubscribeSchema>;
export type CategorySubscribeInfoType = Partial<CategorySubscribeType>;
export type CategorySubscribeItemListType = z.infer<typeof categorySubscribeItemListSchema>;
