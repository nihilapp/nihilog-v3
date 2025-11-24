import type { DeleteCategorySubscribeType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useDeletes } from '@/_hooks/common';
import { useInvalidateCategorySubscribeCache } from '@/_keys/subscribe/category-subscribe/category-subscribe.keys';

/**
 * @description 다수 카테고리 구독을 일괄 해제하는 커스텀 훅
 */
export function useMultipleDeleteCategorySubscribe() {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = useDeletes<MultipleResultType, DeleteCategorySubscribeType>({
    url: [
      'users',
      'subscribes',
      'categories',
      'multiple',
    ],
    callback(_res) {
      // 카테고리 구독 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
