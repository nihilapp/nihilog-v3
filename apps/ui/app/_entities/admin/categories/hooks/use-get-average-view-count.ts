import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AverageViewPerCategoryItemType } from '@/_types';

interface UseGetAverageViewCountOptions extends QueryOptionType<AverageViewPerCategoryItemType[]> {
  analyzeStatData: AnalyzeStatType;
}

/**
 * @description 카테고리별 평균 조회수를 조회하는 커스텀 훅
 * @param {UseGetAverageViewCountOptions} options - 쿼리 옵션
 */
export function useGetAverageViewCount(options: UseGetAverageViewCountOptions) {
  const { analyzeStatData, ...queryOptions } = options;

  const query = useGet<AverageViewPerCategoryItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'average-views',
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
