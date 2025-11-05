import { useGet } from '@/_entities/common/hooks';
import type { UserRoleDistributionItemType } from '@/_types';

/**
 * @description 역할별 사용자 분포를 조회하는 커스텀 훅
 */
export function useAdminGetUserRoleDistribution() {
  const query = useGet<UserRoleDistributionItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'role-distribution',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
