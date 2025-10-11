import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { ResetPasswordType } from '@/_schemas/user.schema';
import type { UserInfoType } from '@/_types';

interface UseResetPasswordOptions extends MutationOptionsType<UserInfoType, ResetPasswordType> {}

/**
 * @description 비밀번호 재설정을 위한 커스텀 훅
 * @param {UseResetPasswordOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 비밀번호 재설정 뮤테이션 객체
 */
export function useResetPassword(options: UseResetPasswordOptions = {}) {
  const router = useRouter();

  const {
    response: userInfo,
    ...query
  } = usePost<UserInfoType, ResetPasswordType>({
    url: [
      'auth', 'reset-password',
    ],
    key: authKeys.resetPassword(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 비밀번호 재설정 성공 시 로그인 페이지로 이동
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
