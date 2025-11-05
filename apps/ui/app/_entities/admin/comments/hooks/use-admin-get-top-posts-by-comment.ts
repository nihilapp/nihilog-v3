import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { TopPostsByCommentItemType } from '@/_types';

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
