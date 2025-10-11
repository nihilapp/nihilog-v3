import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SignInType } from '@/_schemas/user.schema';
import type { UserInfoType } from '@/_types';

interface UseSignInOptions extends MutationOptionsType<UserInfoType, SignInType> {}

/**
 * @description 로그인을 위한 커스텀 훅
 * @param {UseSignInOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 로그인 뮤테이션 객체
 */
export function useSignIn(options: UseSignInOptions = {}) {
  const router = useRouter();

  const {
    response: session,
    ...query
  } = usePost<UserInfoType, SignInType>({
    url: [
      'auth', 'signin',
    ],
    key: authKeys.signin(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 로그인 성공 시 홈으로 이동
      router.push('/');
    },
    errorCallback(err) {
      toast.error(err.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return {
    session,
    ...query,
  };
}
