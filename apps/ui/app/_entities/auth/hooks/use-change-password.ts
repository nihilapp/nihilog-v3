import { toast } from 'sonner';

import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { ChangePasswordType } from '@/_types';
import type { SelectUserInfoType } from '@/_types';

/**
 * @description 사용자 비밀번호를 변경하는 커스텀 훅
 */
export function useChangePassword() {
  const invalidateCache = useInvalidateAuthCache();

  const mutation = usePut<SelectUserInfoType, ChangePasswordType>({
    url: [
      'auth',
      'password',
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
