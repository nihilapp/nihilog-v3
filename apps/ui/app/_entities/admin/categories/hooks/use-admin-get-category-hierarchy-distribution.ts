import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoryHierarchyDistributionItemType } from '@/_types';

interface OptionType extends QueryOptionType<CategoryHierarchyDistributionItemType[]> {}

/**
 * @description 카테고리 계층별 분포를 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetCategoryHierarchyDistribution(options: OptionType) {
  const query = useGet<CategoryHierarchyDistributionItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'hierarchy-distribution',
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
