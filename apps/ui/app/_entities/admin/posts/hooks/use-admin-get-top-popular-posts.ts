import type { AnalyzeStatType } from '@nihilog/schemas';
import type { TopPopularPostItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 인기 포스트 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTopPopularPosts(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TopPopularPostItemType[]>({
    url: [
      'admin',
      'posts',
      'analyze',
      'top-popular',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
