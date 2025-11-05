import { useInvalidateAdminSubscribeCache } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import { usePatch } from '@/_entities/common/hooks';
import type { UpdateCategorySubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

/**
 * @description 관리자가 다수 카테고리 구독을 일괄 수정하는 커스텀 훅
 */
export function useAdminMultipleUpdateCategorySubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = usePatch<MultipleResultType, UpdateCategorySubscribeType>({
    url: [
      'admin',
      'subscribes',
      'categories',
      'multiple',
    ],
    callback(_res) {
      // Admin Subscribe 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
