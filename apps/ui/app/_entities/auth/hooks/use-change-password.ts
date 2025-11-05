import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import { usePut } from '@/_entities/common/hooks';
import type { ChangePasswordType } from '@/_schemas';
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
    callback(_res) {
      // 인증 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
