import type { AnalyzeStatType } from '@nihilog/schemas';
import type { UserGrowthRateItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 사용자 성장률을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetUserGrowthRate(analyzeStatData: AnalyzeStatType) {
  const query = useGet<UserGrowthRateItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'growth-rate',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
