import type { UpdateCategorySubscribeType } from '@nihilog/schemas';
import type { SelectCtgrySbcrMpngType } from '@nihilog/schemas';

import { usePut } from '@/_hooks/common';
import { useInvalidateCategorySubscribeCache } from '@/_keys/subscribe/category-subscribe/category-subscribe.keys';

/**
 * @description 카테고리 구독 설정을 변경하는 커스텀 훅
 * @param {number} ctgrySbcrNo - 카테고리 구독 번호
 */
export function useUpdateCategorySubscribe(ctgrySbcrNo: number) {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePut<SelectCtgrySbcrMpngType, UpdateCategorySubscribeType>({
    url: [
      'users',
      'subscribes',
      'categories',
      ctgrySbcrNo.toString(),
    ],
    callback(_res) {
      // 카테고리 구독 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
