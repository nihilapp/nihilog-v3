import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { CommentAverageDepthItemType } from '@/_types';

/**
 * @description 평균 답글 깊이를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetCommentAverageDepth(analyzeStatData: AnalyzeStatType) {
  const query = useGet<CommentAverageDepthItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'average-depth',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
