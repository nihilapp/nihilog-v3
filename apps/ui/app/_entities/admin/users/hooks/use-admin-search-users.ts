import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { getToastStyle } from '@/_libs';
import type { SearchUserType } from '@/_schemas/user.schema';
import type { ListType, SelectUserInfoListItemType } from '@/_types';

interface UseAdminSearchUsersOptions extends QueryOptionType<ListType<SelectUserInfoListItemType>> {
  searchParams?: SearchUserType;
}

/**
 * @description 관리자용 사용자 검색을 위한 커스텀 훅
 * @param {UseAdminSearchUsersOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 사용자 검색 쿼리 객체
 */
export function useAdminSearchUsers(options: UseAdminSearchUsersOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<ListType<SelectUserInfoListItemType>, SearchUserType>({
    url: [
      'admin', 'users', 'search',
    ],
    key: adminUsersKeys.search(searchParams),
    body: searchParams,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    options: queryOptions,
  });

  return query;
}
