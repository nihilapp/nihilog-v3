import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { TopPopularCategoryItemType } from '@/_types';

/**
 * @description 카테고리별 인기 지수 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTopPopularCategories(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TopPopularCategoryItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'popular-index',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
