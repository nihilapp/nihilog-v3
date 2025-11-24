import type { SubscribeNotificationDistributionItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

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
