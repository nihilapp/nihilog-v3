import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UserRoleDistributionItemType } from '@/_types';

interface UseAdminGetUserRoleDistributionOptions extends QueryOptionType<UserRoleDistributionItemType[]> {}

/**
 * @description 역할별 사용자 분포를 조회하는 커스텀 훅
 * @param {UseAdminGetUserRoleDistributionOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetUserRoleDistribution(options: UseAdminGetUserRoleDistributionOptions = {}) {
  const query = useGet<UserRoleDistributionItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'role-distribution',
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
