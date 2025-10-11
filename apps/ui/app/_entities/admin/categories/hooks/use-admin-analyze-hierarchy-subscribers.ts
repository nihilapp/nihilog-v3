import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { CategoryHierarchySubscriberDistributionItemType } from '@/_types/category.types';

interface UseAdminAnalyzeHierarchySubscribersOptions extends QueryOptionType<CategoryHierarchySubscriberDistributionItemType[]> {}

export function useAdminAnalyzeHierarchySubscribers(options: UseAdminAnalyzeHierarchySubscribersOptions = {}) {
  const query = useGet<CategoryHierarchySubscriberDistributionItemType[]>({
    url: [
      'admin', 'categories', 'analyze', 'hierarchy-subscribers',
    ],
    key: adminCategoriesKeys.analyzeHierarchySubscribers(),
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
