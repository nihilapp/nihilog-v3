import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';
import type { SearchUserType } from '@/_schemas/user.schema';
import type { MultipleResultType } from '@/_types';

interface UseAdminDeleteMultipleUsersOptions extends MutationOptionsType<MultipleResultType<boolean>, number[]> {}

/**
 * @description 관리자용 다수 사용자 삭제를 위한 커스텀 훅
 * @param {UseAdminDeleteMultipleUsersOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 사용자 삭제 뮤테이션 객체
 */
export function useAdminDeleteMultipleUsers(options: UseAdminDeleteMultipleUsersOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<MultipleResultType<boolean>, number[]>({
    url: [
      'admin', 'users', 'multiple',
    ],
    key: adminUsersKeys.deleteMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 사용자 삭제 성공 시 관련 쿼리 무효화
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
