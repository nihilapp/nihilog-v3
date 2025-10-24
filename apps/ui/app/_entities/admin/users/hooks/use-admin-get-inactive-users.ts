import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { InactiveUsersListItemType } from '@/_types';

interface OptionType extends QueryOptionType<InactiveUsersListItemType[]> {
  daysThreshold?: number;
}

/**
 * @description 비활성 사용자 목록을 조회하는 커스텀 훅
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetInactiveUsers(options: OptionType = {}) {
  const { daysThreshold, ...queryOptions } = options;

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
    ...queryOptions,
  });

  return query;
}
