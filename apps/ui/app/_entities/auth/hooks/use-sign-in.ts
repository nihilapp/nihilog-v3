import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SignInType } from '@/_types';
import type { SelectUserInfoType } from '@/_types';

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
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 인증 관련 캐시 무효화
      invalidateCache();

      if (res.data?.userRole === 'ADMIN') {
        router.push('/admin/dashboard');
      }
      else {
        router.push('/');
      }
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
