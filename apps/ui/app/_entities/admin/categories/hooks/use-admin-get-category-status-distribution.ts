import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoryStatusDistributionItemType } from '@/_types';

interface OptionType extends QueryOptionType<CategoryStatusDistributionItemType[]> {}

/**
 * @description 카테고리 상태별 분포를 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetCategoryStatusDistribution(options: OptionType) {
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
    ...options,
  });

  return query;
}
