import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoryHierarchySubscriberDistributionItemType } from '@/_types';

/**
 * @description 카테고리 계층별 구독자 분포를 조회하는 커스텀 훅
 */
export function useAdminGetCategoryHierarchySubscribers() {
  const query = useGet<CategoryHierarchySubscriberDistributionItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'hierarchy-subscribers',
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
  });

  return query;
}
