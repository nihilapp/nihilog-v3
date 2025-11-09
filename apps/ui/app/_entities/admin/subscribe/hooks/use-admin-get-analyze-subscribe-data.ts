import type { AnalyzeStatType } from '@nihilog/schemas';
import type { AnalyzeSubscribeStatItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 구독 설정 분석 통계 데이터를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetAnalyzeSubscribeData(analyzeStatData: AnalyzeStatType) {
  const query = useGet<AnalyzeSubscribeStatItemType[]>({
    url: [
      'admin',
      'subscribes',
      'analyze',
      'overview',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
