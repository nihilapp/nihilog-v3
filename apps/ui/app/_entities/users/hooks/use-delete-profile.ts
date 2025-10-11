import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { usersKeys } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { WithdrawType } from '@/_schemas/user.schema';
import type { SelectUserInfoType } from '@/_types';

interface UseDeleteProfileOptions extends MutationOptionsType<SelectUserInfoType, WithdrawType> {}

/**
 * @description 사용자 프로필 삭제(회원탈퇴)를 위한 커스텀 훅
 * @param {UseDeleteProfileOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 프로필 삭제 뮤테이션 객체
 */
export function useDeleteProfile(options: UseDeleteProfileOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<SelectUserInfoType, WithdrawType>({
    url: [
      'users', 'profile',
    ],
    key: usersKeys.profile(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 프로필 삭제 성공 시 관련 쿼리 무효화 및 로그아웃 처리
      queryClient.invalidateQueries({
        queryKey: authKeys.session().queryKey,
      });
      // 사용자 프로필 정보도 무효화
      queryClient.invalidateQueries({
        queryKey: usersKeys.profile().queryKey,
      });
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
