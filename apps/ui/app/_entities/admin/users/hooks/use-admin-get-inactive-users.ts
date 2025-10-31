import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { InactiveUsersListItemType } from '@/_types';

/**
 * @description 비활성 사용자 목록을 조회하는 커스텀 훅
 * @param {number} [daysThreshold] - 비활성 기준 일수 (선택사항)
 */
export function useAdminGetInactiveUsers(daysThreshold?: number) {
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
