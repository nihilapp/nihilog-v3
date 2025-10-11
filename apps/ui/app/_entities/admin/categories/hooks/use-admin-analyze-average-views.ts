import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { AverageViewPerCategoryItemType } from '@/_types/category.types';

interface UseAdminAnalyzeAverageViewsOptions extends MutationOptionsType<AverageViewPerCategoryItemType[], AnalyzeStatType> {}

export function useAdminAnalyzeAverageViews(options: UseAdminAnalyzeAverageViewsOptions = {}) {
  const query = usePost<AverageViewPerCategoryItemType[], AnalyzeStatType>({
    url: [
      'admin', 'categories', 'analyze', 'average-views',
    ],
    key: adminCategoriesKeys.analyzeAverageViews(),
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
