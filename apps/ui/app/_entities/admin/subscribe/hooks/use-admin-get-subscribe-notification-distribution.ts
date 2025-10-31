import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
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
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  return query;
}
