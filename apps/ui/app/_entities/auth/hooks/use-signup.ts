import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateUserType, UserInfoType } from '@/_schemas/user.schema';

interface UseSignUpOptions extends MutationOptionsType<UserInfoType, CreateUserType> {}

/**
 * @description 회원가입을 위한 커스텀 훅
 * @param {UseSignUpOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 회원가입 뮤테이션 객체
 */
export function useSignUp(options: UseSignUpOptions = {}) {
  const router = useRouter();

  const {
    response: userInfo,
    ...query
  } = usePost<UserInfoType, CreateUserType>({
    url: [
      'auth', 'signup',
    ],
    key: authKeys.signup(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 회원가입 성공 시 로그인 페이지로 이동
      router.push('/auth/signin');
    },
    errorCallback(err) {
      toast.error(err.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return {
    userInfo,
    ...query,
  };
}
