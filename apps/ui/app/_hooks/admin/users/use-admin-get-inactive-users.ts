import type { InactiveUsersListItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 비활성 사용자 목록을 조회하는 커스텀 훅
 * @param {number} [daysThreshold] - 비활성 기준 일수 (선택사항)
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetInactiveUsers(daysThreshold?: number, enabled: boolean = true) {
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
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
