import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { getToastStyle } from '@/_libs';
import type { UpdateUserType, SearchUserType } from '@/_schemas/user.schema';
import type { MultipleResultType, SelectUserInfoType } from '@/_types';

interface UseAdminUpdateMultipleUsersOptions extends MutationOptionsType<MultipleResultType<SelectUserInfoType>, UpdateUserType[]> {}

/**
 * @description 관리자용 다수 사용자 정보 수정을 위한 커스텀 훅
 * @param {UseAdminUpdateMultipleUsersOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 사용자 수정 뮤테이션 객체
 */
export function useAdminUpdateMultipleUsers(options: UseAdminUpdateMultipleUsersOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<MultipleResultType<SelectUserInfoType>, UpdateUserType[]>({
    url: [
      'admin', 'users', 'multiple',
    ],
    key: adminUsersKeys.updateMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 사용자 수정 성공 시 관련 쿼리 무효화
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
