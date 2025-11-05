import { useDeletes } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import type { DeleteCategorySubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

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
