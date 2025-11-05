import { useGet } from '@/_entities/common/hooks';
import type { SubscribeNotificationDistributionItemType } from '@/_types';

/**
 * @description 알림 설정별 분포 통계를 조회하는 커스텀 훅
 */
export function useAdminGetSubscribeNotificationDistribution() {
  const query = useGet<SubscribeNotificationDistributionItemType[]>({
    url: [
      'admin',
      'subscribes',
      'analyze',
      'notification-distribution',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
