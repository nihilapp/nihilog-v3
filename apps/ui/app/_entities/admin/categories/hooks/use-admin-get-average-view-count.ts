import type { AnalyzeStatType } from '@nihilog/schemas';
import type { AverageViewPerCategoryItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

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
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
