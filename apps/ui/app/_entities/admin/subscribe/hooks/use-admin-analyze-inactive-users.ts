import { toast } from 'sonner';

import { adminSubscribeKeys } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { TotalInactiveNotificationUsersItemType } from '@/_types/subscribe.types';

interface UseAdminAnalyzeInactiveUsersOptions extends MutationOptionsType<TotalInactiveNotificationUsersItemType[], AnalyzeStatType> {}

export function useAdminAnalyzeInactiveUsers(options: UseAdminAnalyzeInactiveUsersOptions = {}) {
  const query = usePost<TotalInactiveNotificationUsersItemType[], AnalyzeStatType>({
    url: [
      'admin', 'subscribes', 'analyze', 'inactive-users',
    ],
    key: adminSubscribeKeys.analyzeInactiveUsers(),
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
