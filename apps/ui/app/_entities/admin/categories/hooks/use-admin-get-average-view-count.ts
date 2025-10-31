import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AverageViewPerCategoryItemType } from '@/_types';

/**
 * @description 카테고리별 평균 조회 수를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetAverageViewCount(analyzeStatData: AnalyzeStatType) {
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
  });

  return query;
}
