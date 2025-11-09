import type { CreateTagSubscribeType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useInvalidateAdminSubscribeCache } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import { usePost } from '@/_entities/common/hooks';

/**
 * @description 관리자가 다수 태그 구독을 일괄 생성하는 커스텀 훅
 */
export function useAdminMultipleCreateTagSubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = usePost<MultipleResultType, CreateTagSubscribeType>({
    url: [
      'admin',
      'subscribes',
      'tags',
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
