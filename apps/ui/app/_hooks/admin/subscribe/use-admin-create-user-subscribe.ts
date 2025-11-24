import type { CreateSubscribeType } from '@nihilog/schemas';
import type { SelectUserSbcrInfoType } from '@nihilog/schemas';

import { usePost } from '@/_hooks/common';

import { useInvalidateAdminSubscribeCache } from '@/_keys/admin/subscribe/admin-subscribe.keys';

/**
 * @description 관리자가 특정 사용자 구독 설정을 생성하는 커스텀 훅
 */
export function useAdminCreateUserSubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = usePost<SelectUserSbcrInfoType, CreateSubscribeType>({
    url: [
      'admin',
      'subscribes',
    ],
    callback(_res) {
      // Admin Subscribe 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
