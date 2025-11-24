import type { AnalyzeStatType } from '@nihilog/schemas';
import type { UserRetentionRateItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 사용자 유지율을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetUserRetentionRate(analyzeStatData: AnalyzeStatType) {
  const query = useGet<UserRetentionRateItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'retention-rate',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
