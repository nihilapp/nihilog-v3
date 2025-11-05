import { useGet } from '@/_entities/common/hooks';
import type { InactiveUsersListItemType } from '@/_types';

/**
 * @description 비활성 사용자 목록을 조회하는 커스텀 훅
 * @param {number} [daysThreshold] - 비활성 기준 일수 (선택사항)
 */
export function useAdminGetInactiveUsers(daysThreshold?: number) {
  const query = useGet<InactiveUsersListItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'inactive-users',
    ],
    params: {
      daysThreshold,
    },
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
