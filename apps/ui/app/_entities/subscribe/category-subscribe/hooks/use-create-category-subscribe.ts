import type { CreateCategorySubscribeType } from '@nihilog/schemas';
import type { SelectCtgrySbcrMpngType } from '@nihilog/schemas';

import { usePost } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';

/**
 * @description 특정 카테고리를 구독하는 커스텀 훅
 * @param {number} ctgryNo - 카테고리 번호
 */
export function useCreateCategorySubscribe(ctgryNo: number) {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePost<SelectCtgrySbcrMpngType, CreateCategorySubscribeType>({
    url: [
      'users',
      'subscribes',
      'categories',
      ctgryNo.toString(),
    ],
    callback(_res) {
      // 카테고리 구독 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
