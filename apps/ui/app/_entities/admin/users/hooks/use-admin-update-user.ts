import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { getToastStyle } from '@/_libs';
import type { SearchUserType, UpdateUserType } from '@/_schemas/user.schema';
import type { SelectUserInfoType } from '@/_types';

interface UseAdminUpdateUserOptions extends MutationOptionsType<SelectUserInfoType, UpdateUserType> {}

/**
 * @description 관리자용 사용자 정보 수정을 위한 커스텀 훅
 * @param {number} userNo - 수정할 사용자 번호
 * @param {UseAdminUpdateUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 사용자 수정 뮤테이션 객체
 */
export function useAdminUpdateUser(userNo: number, options: UseAdminUpdateUserOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<SelectUserInfoType, UpdateUserType>({
    url: [
      'admin', 'users', userNo,
    ],
    key: adminUsersKeys.update(userNo),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 사용자 수정 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminUsersKeys.byNo(userNo).queryKey,
      });
      // 관리자 사용자 목록도 무효화
      queryClient.invalidateQueries({
        queryKey: adminUsersKeys.search({} as SearchUserType).queryKey,
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
