import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { TopCommentPostItemType } from '@/_types';

/**
 * @description 댓글 많은 포스트 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTopPostsByComment(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TopCommentPostItemType[]>({
    url: [
      'admin',
      'posts',
      'analyze',
      'top-comments',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
