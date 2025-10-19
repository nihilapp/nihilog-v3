import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoryHierarchySubscriberDistributionItemType } from '@/_types';

interface OptionType extends QueryOptionType<CategoryHierarchySubscriberDistributionItemType[]> {}

/**
 * @description 카테고리 계층별 구독자 분포를 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetCategoryHierarchySubscribers(options: OptionType) {
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
    ...options,
  });

  return query;
}
