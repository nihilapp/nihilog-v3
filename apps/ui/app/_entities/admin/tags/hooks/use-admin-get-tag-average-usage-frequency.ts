import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { TagAverageUsageFrequencyItemType } from '@/_types';

/**
 * @description 태그별 평균 사용 빈도를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTagAverageUsageFrequency(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TagAverageUsageFrequencyItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'frequency',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
