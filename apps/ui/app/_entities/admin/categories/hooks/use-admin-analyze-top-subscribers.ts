import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { TopCategoriesBySubscriberItemType } from '@/_types/category.types';

interface UseAdminAnalyzeTopSubscribersOptions extends QueryOptionType<TopCategoriesBySubscriberItemType[]> {
  limit?: number;
}

export function useAdminAnalyzeTopSubscribers(options: UseAdminAnalyzeTopSubscribersOptions = {}) {
  const { limit, ...restOptions } = options;

  const query = useGet<TopCategoriesBySubscriberItemType[]>({
    url: [
      'admin', 'categories', 'analyze', 'top-subscribers',
    ],
    key: adminCategoriesKeys.analyzeTopSubscribers(limit || 10),
    params: limit
      ? { limit, }
      : undefined,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...restOptions,
  });

  return query;
}
