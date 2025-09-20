import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { WithdrawType, UserInfoType } from '@/_schemas/user.schema';

type WithdrawTypeWithoutPasswordConfirm = Omit<WithdrawType, 'passwordConfirm'>;

interface UseWithdrawOptions extends MutationOptionsType<UserInfoType, WithdrawTypeWithoutPasswordConfirm | undefined> {}

/**
 * @description 회원탈퇴를 위한 커스텀 훅
 * @param {UseWithdrawOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 회원탈퇴 뮤테이션 객체
 */
export function useWithdraw(options: UseWithdrawOptions = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    response: userInfo,
    ...query
  } = useDelete<UserInfoType, WithdrawTypeWithoutPasswordConfirm>({
    url: [
      'auth', 'withdraw',
    ],
    key: authKeys.withdraw(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 회원탈퇴 성공 시 세션 갱신
      queryClient.invalidateQueries({
        queryKey: authKeys.session().queryKey,
      });
      // 홈으로 이동
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
    userInfo,
    ...query,
  };
}
