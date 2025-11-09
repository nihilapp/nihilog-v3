import type { UpdateTagSubscribeType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useInvalidateAdminSubscribeCache } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import { usePatch } from '@/_entities/common/hooks';

/**
 * @description 관리자가 다수 태그 구독을 일괄 수정하는 커스텀 훅
 */
export function useAdminMultipleUpdateTagSubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = usePatch<MultipleResultType, UpdateTagSubscribeType>({
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
