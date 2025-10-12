import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { InactiveUsersListItemType } from '@/_types';

interface UseAdminGetInactiveUsersOptions extends QueryOptionType<InactiveUsersListItemType[]> {
  daysThreshold?: number;
}

/**
 * @description 관리자용 비활성 사용자 목록 조회를 위한 커스텀 훅
 * @param {UseAdminGetInactiveUsersOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 비활성 사용자 목록 조회 쿼리 객체
 */
export function useAdminGetInactiveUsers(options: UseAdminGetInactiveUsersOptions = {}) {
  const { daysThreshold, ...restOptions } = options;

  const query = useGet<InactiveUsersListItemType[]>({
    url: [
      'admin', 'users', 'analyze', 'inactive-users',
    ],
    key: adminUsersKeys.inactiveUsers(),
    params: daysThreshold
      ? { daysThreshold, }
      : undefined,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...restOptions,
  });

  return query;
}
