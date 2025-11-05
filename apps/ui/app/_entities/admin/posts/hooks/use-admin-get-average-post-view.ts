import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { AverageViewStatItemType } from '@/_types';

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
