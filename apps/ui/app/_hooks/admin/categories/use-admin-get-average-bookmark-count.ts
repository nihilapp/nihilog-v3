import type { AnalyzeStatType } from '@nihilog/schemas';
import type { AverageBookmarkPerCategoryItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 카테고리별 평균 북마크 수를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetAverageBookmarkCount(analyzeStatData: AnalyzeStatType) {
  const query = useGet<AverageBookmarkPerCategoryItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'average-bookmarks',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
