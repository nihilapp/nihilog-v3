import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SubscribeNotificationDistributionItemType } from '@/_types';

interface UseGetSubscribeNotificationDistributionOptions extends QueryOptionType<SubscribeNotificationDistributionItemType[]> {}

/**
 * @description 알림 설정별 분포 통계를 조회하는 커스텀 훅
 * @param {UseGetSubscribeNotificationDistributionOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetSubscribeNotificationDistribution(options: UseGetSubscribeNotificationDistributionOptions = {}) {
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
    ...options,
  });

  return query;
}
