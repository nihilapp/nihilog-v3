import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
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
