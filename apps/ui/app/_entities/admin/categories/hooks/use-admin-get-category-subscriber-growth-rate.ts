import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { CategorySubscriberGrowthRateItemType } from '@/_types';

interface OptionType extends QueryOptionType<CategorySubscriberGrowthRateItemType[]> {
  analyzeStatData: AnalyzeStatType;
}

/**
 * @description 카테고리 구독자 성장률을 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetCategorySubscriberGrowthRate(options: OptionType) {
  const { analyzeStatData, ...queryOptions } = options;

  const query = useGet<CategorySubscriberGrowthRateItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'subscriber-growth-rate',
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
