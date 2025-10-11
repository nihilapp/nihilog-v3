import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

interface UseAdminDeleteUserOptions extends MutationOptionsType<SelectUserInfoType, undefined> {}

/**
 * @description 관리자용 사용자 삭제를 위한 커스텀 훅
 * @param {number} userNo - 삭제할 사용자 번호
 * @param {UseAdminDeleteUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 사용자 삭제 뮤테이션 객체
 */
export function useAdminDeleteUser(userNo: number, options: UseAdminDeleteUserOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<SelectUserInfoType, undefined>({
    url: [
      'admin', 'users', userNo,
    ],
    key: adminUsersKeys.deleteUser(userNo),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 사용자 삭제 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminUsersKeys.userByNo(userNo).queryKey,
      });
      // 관리자 사용자 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: adminUsersKeys.userList({}).queryKey,
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
