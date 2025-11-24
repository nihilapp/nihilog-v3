import type { CreateCategorySubscribeType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useInvalidateAdminSubscribeCache } from '@/_keys/admin/subscribe/admin-subscribe.keys';
import { usePost } from '@/_hooks/common';

/**
 * @description 관리자가 다수 카테고리 구독을 일괄 생성하는 커스텀 훅
 */
export function useAdminMultipleCreateCategorySubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = usePost<MultipleResultType, CreateCategorySubscribeType>({
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
