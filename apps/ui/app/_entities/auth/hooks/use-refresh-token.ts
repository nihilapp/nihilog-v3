import type { SelectUserInfoType } from '@nihilog/schemas';

import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import { usePost } from '@/_entities/common/hooks';

/**
 * @description 액세스 토큰을 갱신하는 커스텀 훅
 */
export function useRefreshToken() {
  const invalidateCache = useInvalidateAuthCache();

  const mutation = usePost<SelectUserInfoType, void>({
    url: [
      'auth',
      'refresh',
    ],
    callback(_res) {
      // 인증 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
