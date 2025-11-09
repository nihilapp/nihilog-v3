import type { AnalyzeStatType } from '@nihilog/schemas';
import type { TagSubscriberGrowthRateItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그별 구독자 성장률을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTagSubscriberGrowth(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TagSubscriberGrowthRateItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'subscriber-growth',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
