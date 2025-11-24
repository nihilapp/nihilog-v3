import type { AnalyzeStatType } from '@nihilog/schemas';
import type { TopPostsByCommentItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 포스트별 댓글 수 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTopPostsByComment(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TopPostsByCommentItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'top-posts',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
