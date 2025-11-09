import type { DeleteSubscribeType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useDeletes } from '@/_entities/common/hooks';

import { useInvalidateAdminSubscribeCache } from '../admin-subscribe.keys';

/**
 * @description 다수 사용자 구독 설정을 일괄 삭제하는 커스텀 훅
 */
export function useAdminMultipleDeleteUserSubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = useDeletes<MultipleResultType, DeleteSubscribeType>({
    url: [
      'admin',
      'subscribes',
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
