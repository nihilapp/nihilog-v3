import { useGet } from '@/_entities/common/hooks';
import type { UserStatusDistributionItemType } from '@/_types';

/**
 * @description 상태별 사용자 분포를 조회하는 커스텀 훅
 */
export function useAdminGetUserStatusDistribution() {
  const query = useGet<UserStatusDistributionItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'status-distribution',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
