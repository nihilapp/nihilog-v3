import type { UpdateCategorySubscribeType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { usePut } from '@/_hooks/common';
import { useInvalidateCategorySubscribeCache } from '@/_keys/subscribe/category-subscribe/category-subscribe.keys';

/**
 * @description 다수 카테고리 구독 설정을 일괄 변경하는 커스텀 훅
 */
export function useMultipleUpdateCategorySubscribe() {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePut<MultipleResultType, UpdateCategorySubscribeType>({
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
