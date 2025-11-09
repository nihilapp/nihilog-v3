import type { AnalyzeStatType } from '@nihilog/schemas';
import type { TagUsageTrendItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그별 사용 추이를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTagUsageTrend(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TagUsageTrendItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'usage-trend',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
