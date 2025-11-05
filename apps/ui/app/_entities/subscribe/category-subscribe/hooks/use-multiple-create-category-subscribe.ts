import { usePost } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import type { CreateCategorySubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

/**
 * @description 다수 카테고리를 일괄 구독하는 커스텀 훅
 */
export function useMultipleCreateCategorySubscribe() {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePost<MultipleResultType, CreateCategorySubscribeType>({
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
