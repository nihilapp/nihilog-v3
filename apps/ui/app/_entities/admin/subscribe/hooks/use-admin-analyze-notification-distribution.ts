import { toast } from 'sonner';

import { adminSubscribeKeys } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { SubscribeNotificationDistributionItemType } from '@/_types/subscribe.types';

interface UseAdminAnalyzeNotificationDistributionOptions extends QueryOptionType<SubscribeNotificationDistributionItemType[]> {}

export function useAdminAnalyzeNotificationDistribution(options: UseAdminAnalyzeNotificationDistributionOptions = {}) {
  const query = useGet<SubscribeNotificationDistributionItemType[]>({
    url: [
      'admin', 'subscribes', 'analyze', 'notification-distribution',
    ],
    key: adminSubscribeKeys.analyzeNotificationDistribution(),
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
