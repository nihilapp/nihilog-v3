import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AverageViewStatItemType } from '@/_types';

interface OptionType extends QueryOptionType<AverageViewStatItemType[]> {
  analyzeStatData: AnalyzeStatType;
}

/**
 * @description 카테고리별 평균 조회 수를 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetAverageViewCount(options: OptionType) {
  const { analyzeStatData, ...queryOptions } = options;

  const query = useGet<AverageViewStatItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'average-view',
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
