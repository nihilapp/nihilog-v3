import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagStatusDistributionItemType } from '@/_types';

/**
 * @description 태그 상태별 분포를 조회하는 커스텀 훅
 */
export function useAdminGetTagStatusDistribution() {
  const query = useGet<TagStatusDistributionItemType[]>({
    url: [
      'admin',
      'tags',
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
