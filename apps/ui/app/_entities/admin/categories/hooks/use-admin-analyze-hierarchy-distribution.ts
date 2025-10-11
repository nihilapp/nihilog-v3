import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { CategoryHierarchyDistributionItemType } from '@/_types/category.types';

interface UseAdminAnalyzeHierarchyDistributionOptions extends QueryOptionType<CategoryHierarchyDistributionItemType[]> {}

export function useAdminAnalyzeHierarchyDistribution(options: UseAdminAnalyzeHierarchyDistributionOptions = {}) {
  const query = useGet<CategoryHierarchyDistributionItemType[]>({
    url: [
      'admin', 'categories', 'analyze', 'hierarchy-distribution',
    ],
    key: adminCategoriesKeys.analyzeHierarchyDistribution(),
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
