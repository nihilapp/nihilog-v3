import type { AnalyzeStatType } from '@nihilog/schemas';
import type { ActiveUserAnalysisItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 활성 사용자 분석을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetActiveUserAnalysis(analyzeStatData: AnalyzeStatType) {
  const query = useGet<ActiveUserAnalysisItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'active-users',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
