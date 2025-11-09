import type { AnalyzeStatType } from '@nihilog/schemas';
import type { TopUsedTagItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그별 사용 횟수 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTopUsedTags(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TopUsedTagItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'top-used',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
