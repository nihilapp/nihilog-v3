import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UserStatusDistributionItemType } from '@/_types';

interface OptionType extends QueryOptionType<UserStatusDistributionItemType[]> {}

/**
 * @description 상태별 사용자 분포를 조회하는 커스텀 훅
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetUserStatusDistribution(options: OptionType = {}) {
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
    ...options,
  });

  return query;
}
