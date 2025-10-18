import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { CategorySubscriberGrowthRateItemType } from '@/_types';

interface UseGetCategorySubscriberGrowthRateOptions extends QueryOptionType<CategorySubscriberGrowthRateItemType[]> {
  analyzeStatData: AnalyzeStatType;
}

/**
 * @description 카테고리별 구독자 성장률을 조회하는 커스텀 훅
 * @param {UseGetCategorySubscriberGrowthRateOptions} options - 쿼리 옵션
 */
export function useGetCategorySubscriberGrowthRate(options: UseGetCategorySubscriberGrowthRateOptions) {
  const { analyzeStatData, ...queryOptions } = options;

  const query = useGet<CategorySubscriberGrowthRateItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'subscriber-growth',
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
