import type { AnalyzeStatType } from '@nihilog/schemas';
import type { TopUsersByContributionItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 사용자별 기여도 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTopUsersByContribution(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TopUsersByContributionItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'top-contribution',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
