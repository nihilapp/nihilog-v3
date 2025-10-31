import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoryStatusDistributionItemType } from '@/_types';

/**
 * @description 카테고리 상태별 분포를 조회하는 커스텀 훅
 */
export function useAdminGetCategoryStatusDistribution() {
  const query = useGet<CategoryStatusDistributionItemType[]>({
    url: [
      'admin',
      'categories',
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
