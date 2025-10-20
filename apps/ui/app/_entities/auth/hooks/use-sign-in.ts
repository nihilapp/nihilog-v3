import { toast } from 'sonner';

import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SignInType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';
import { useRouter } from 'next/navigation';

interface UseSignInOptions extends MutationOptionsType<SelectUserInfoType, SignInType> {}

/**
 * @description 사용자 로그인을 처리하는 커스텀 훅
 * @param {UseSignInOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useSignIn(options: UseSignInOptions = {}) {
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
      } else {
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
    ...options,
  });

  return mutation;
}
