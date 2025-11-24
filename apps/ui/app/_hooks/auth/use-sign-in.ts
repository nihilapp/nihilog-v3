import type { SignInType } from '@nihilog/schemas';
import type { SelectUserInfoType } from '@nihilog/schemas';
import { useRouter } from 'next/navigation';

import { useInvalidateAuthCache } from '@/_keys/auth/auth.keys';
import { usePost } from '@/_hooks/common';
import { useAuthActions } from '@/_stores/auth.store';

/**
 * @description 사용자 로그인을 처리하는 커스텀 훅
 */
export function useSignIn() {
  const invalidateCache = useInvalidateAuthCache();
  const router = useRouter();
  const { setSession, } = useAuthActions();

  const mutation = usePost<SelectUserInfoType, SignInType>({
    url: [
      'auth',
      'signin',
    ],
    callback(res) {
      // 세션 정보를 store에 저장
      if (res.data) {
        setSession(res.data);
      }

      // 인증 관련 캐시 무효화
      invalidateCache();

      if (res.data?.userRole === 'ADMIN') {
        router.push('/admin/dashboard');
      }
      else {
        router.push('/');
      }
    },
    errorCallback(_error) {},
  });

  return mutation;
}
