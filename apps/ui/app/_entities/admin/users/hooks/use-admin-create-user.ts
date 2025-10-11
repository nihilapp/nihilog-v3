import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { CreateUserType } from '@/_schemas/user.schema';
import type { SelectUserInfoType } from '@/_types';

interface UseAdminCreateUserOptions extends MutationOptionsType<SelectUserInfoType, CreateUserType> {}

/**
 * @description 관리자용 사용자 계정 생성을 위한 커스텀 훅
 * @param {UseAdminCreateUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 사용자 생성 뮤테이션 객체
 */
export function useAdminCreateUser(options: UseAdminCreateUserOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePost<SelectUserInfoType, CreateUserType>({
    url: [
      'admin', 'users',
    ],
    key: adminUsersKeys.createUser(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 사용자 생성 성공 시 관련 쿼리 무효화
      // 관리자 사용자 목록만 무효화 (전체 캐시 무효화 불필요)
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
