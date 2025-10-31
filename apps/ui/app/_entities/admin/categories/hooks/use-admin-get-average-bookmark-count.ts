import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_types';
import type { AverageBookmarkStatItemType } from '@/_types';

interface OptionType extends QueryOptionType<AverageBookmarkStatItemType[]> {
  analyzeStatData: AnalyzeStatType;
}

/**
 * @description 카테고리별 평균 북마크 수를 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetAverageBookmarkCount(options: OptionType) {
  const { analyzeStatData, ...queryOptions } = options;

  const query = useGet<AverageBookmarkStatItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'average-bookmark',
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
