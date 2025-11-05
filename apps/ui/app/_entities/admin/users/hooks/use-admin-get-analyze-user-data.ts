import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { AnalyzeUserStatItemType } from '@/_types';

/**
 * @description 사용자 분석 통계 데이터를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetAnalyzeUserData(analyzeStatData: AnalyzeStatType) {
  const query = useGet<AnalyzeUserStatItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'overview',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
