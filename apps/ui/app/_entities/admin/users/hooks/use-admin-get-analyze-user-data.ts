import type { AnalyzeStatType } from '@nihilog/schemas';
import type { AnalyzeUserStatItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 사용자 분석 통계 데이터를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetAnalyzeUserData(analyzeStatData: AnalyzeStatType, enabled: boolean = true) {
  const query = useGet<AnalyzeUserStatItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'overview',
    ],
    params: analyzeStatData,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
