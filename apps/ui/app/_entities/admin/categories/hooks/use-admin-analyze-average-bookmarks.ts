import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { AverageBookmarkPerCategoryItemType } from '@/_types/category.types';

interface UseAdminAnalyzeAverageBookmarksOptions extends MutationOptionsType<AverageBookmarkPerCategoryItemType[], AnalyzeStatType> {}

export function useAdminAnalyzeAverageBookmarks(options: UseAdminAnalyzeAverageBookmarksOptions = {}) {
  const query = usePost<AverageBookmarkPerCategoryItemType[], AnalyzeStatType>({
    url: [
      'admin', 'categories', 'analyze', 'average-bookmarks',
    ],
    key: adminCategoriesKeys.analyzeAverageBookmarks(),
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
