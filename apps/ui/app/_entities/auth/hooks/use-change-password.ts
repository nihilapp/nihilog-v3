import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { ChangePasswordType } from '@/_schemas/user.schema';
import type { UserInfoType } from '@/_types';

interface UseChangePasswordOptions extends MutationOptionsType<UserInfoType, ChangePasswordType> {}

/**
 * @description 로그인된 사용자의 비밀번호 변경을 위한 커스텀 훅
 * @param {UseChangePasswordOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 비밀번호 변경 뮤테이션 객체
 */
export function useChangePassword(options: UseChangePasswordOptions = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    response: userInfo,
    ...query
  } = usePost<UserInfoType, ChangePasswordType>({
    url: [
      'auth', 'change-password',
    ],
    key: authKeys.changePassword(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 비밀번호 변경 성공 시 세션 및 사용자 단건 갱신
      queryClient.invalidateQueries({
        queryKey: authKeys.session().queryKey,
      });
      // 사용자 프로필 정보 갱신
      queryClient.invalidateQueries({
        queryKey: usersKeys.profile().queryKey,
      });
      // 로그인 페이지로 이동
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
