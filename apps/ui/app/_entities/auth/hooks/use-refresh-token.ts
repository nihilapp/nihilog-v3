import { toast } from 'sonner';

import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

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
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
      // 인증 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  return mutation;
}
