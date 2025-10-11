import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { CategoryCreatorStatItemType } from '@/_types/category.types';

interface UseAdminAnalyzeCreatorStatsOptions extends QueryOptionType<CategoryCreatorStatItemType[]> {}

export function useAdminAnalyzeCreatorStats(options: UseAdminAnalyzeCreatorStatsOptions = {}) {
  const query = useGet<CategoryCreatorStatItemType[]>({
    url: [
      'admin', 'categories', 'analyze', 'creator-stats',
    ],
    key: adminCategoriesKeys.analyzeCreatorStats(),
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
