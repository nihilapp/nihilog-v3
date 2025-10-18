import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { CategoryHierarchySubscriberDistributionItemType } from '@/_types';

interface UseGetCategoryHierarchySubscribersOptions extends QueryOptionType<CategoryHierarchySubscriberDistributionItemType[]> {
  analyzeStatData: AnalyzeStatType;
}

/**
 * @description 계층별 구독자 분포를 조회하는 커스텀 훅
 * @param {UseGetCategoryHierarchySubscribersOptions} options - 쿼리 옵션
 */
export function useGetCategoryHierarchySubscribers(options: UseGetCategoryHierarchySubscribersOptions) {
  const { analyzeStatData, ...queryOptions } = options;

  const query = useGet<CategoryHierarchySubscriberDistributionItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'hierarchy-subscribers',
    ],
    params: analyzeStatData,
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
    ...queryOptions,
  });

  return query;
}
