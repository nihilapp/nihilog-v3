import type { AnalyzeStatType } from '@nihilog/schemas';
import type { AverageCommentPerPostItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 평균 댓글 수 / 포스트를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetAverageCommentCount(analyzeStatData: AnalyzeStatType) {
  const query = useGet<AverageCommentPerPostItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'average-per-post',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
