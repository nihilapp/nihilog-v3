import type { AnalyzeStatType } from '@nihilog/schemas';
import type { TagAverageUsageFrequencyItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그별 평균 사용 빈도를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetTagAverageUsageFrequency(analyzeStatData: AnalyzeStatType, enabled: boolean = true) {
  const query = useGet<TagAverageUsageFrequencyItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'frequency',
    ],
    params: analyzeStatData,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
