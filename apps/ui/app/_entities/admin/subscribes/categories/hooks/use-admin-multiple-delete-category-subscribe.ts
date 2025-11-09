import type { DeleteCategorySubscribeType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useInvalidateAdminSubscribeCache } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import { useDeletes } from '@/_entities/common/hooks';

/**
 * @description 관리자가 다수 카테고리 구독을 일괄 삭제하는 커스텀 훅
 */
export function useAdminMultipleDeleteCategorySubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = useDeletes<MultipleResultType, DeleteCategorySubscribeType>({
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
