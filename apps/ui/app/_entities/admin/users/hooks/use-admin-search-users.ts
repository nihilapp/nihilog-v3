import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { SearchUserType } from '@/_schemas/user.schema';
import type { ListType, SelectUserInfoListItemType } from '@/_types';

interface UseAdminSearchUsersOptions extends MutationOptionsType<ListType<SelectUserInfoListItemType>, SearchUserType> {}

/**
 * @description 관리자용 사용자 검색을 위한 커스텀 훅
 * @param {UseAdminSearchUsersOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 사용자 검색 뮤테이션 객체
 */
export function useAdminSearchUsers(options: UseAdminSearchUsersOptions = {}) {
  const query = usePost<ListType<SelectUserInfoListItemType>, SearchUserType>({
    url: [
      'admin', 'users', 'search',
    ],
    key: adminUsersKeys.userList({} as SearchUserType),
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
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
