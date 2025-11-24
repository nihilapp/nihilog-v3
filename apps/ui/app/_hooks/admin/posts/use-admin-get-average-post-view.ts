import type { AnalyzeStatType } from '@nihilog/schemas';
import type { AverageViewStatItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 포스트별 평균 조회수를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetAveragePostView(analyzeStatData: AnalyzeStatType) {
  const query = useGet<AverageViewStatItemType[]>({
    url: [
      'admin',
      'posts',
      'analyze',
      'average-views',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
