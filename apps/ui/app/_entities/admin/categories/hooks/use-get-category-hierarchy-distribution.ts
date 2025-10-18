import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoryHierarchyDistributionItemType } from '@/_types';

interface UseGetCategoryHierarchyDistributionOptions extends QueryOptionType<CategoryHierarchyDistributionItemType[]> {}

/**
 * @description 계층별 카테고리 분포를 조회하는 커스텀 훅
 * @param {UseGetCategoryHierarchyDistributionOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCategoryHierarchyDistribution(options: UseGetCategoryHierarchyDistributionOptions = {}) {
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
