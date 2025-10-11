import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { CategoryHierarchyPostDistributionItemType } from '@/_types/category.types';

interface UseAdminAnalyzeHierarchyPostsOptions extends QueryOptionType<CategoryHierarchyPostDistributionItemType[]> {}

export function useAdminAnalyzeHierarchyPosts(options: UseAdminAnalyzeHierarchyPostsOptions = {}) {
  const query = useGet<CategoryHierarchyPostDistributionItemType[]>({
    url: [
      'admin', 'categories', 'analyze', 'hierarchy-posts',
    ],
    key: adminCategoriesKeys.analyzeHierarchyPosts(),
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
