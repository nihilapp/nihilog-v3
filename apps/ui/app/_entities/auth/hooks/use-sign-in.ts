import type { SignInType } from '@nihilog/schemas';
import type { SelectUserInfoType } from '@nihilog/schemas';
import { useRouter } from 'next/navigation';

import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import { usePost } from '@/_entities/common/hooks';

/**
 * @description 사용자 로그인을 처리하는 커스텀 훅
 */
export function useSignIn() {
  const invalidateCache = useInvalidateAuthCache();
  const router = useRouter();

  const mutation = usePost<SelectUserInfoType, SignInType>({
    url: [
      'auth',
      'signin',
    ],
    callback(res) {
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
