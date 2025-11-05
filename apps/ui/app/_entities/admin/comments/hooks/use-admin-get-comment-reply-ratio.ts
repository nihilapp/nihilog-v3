import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { CommentReplyRatioItemType } from '@/_types';

/**
 * @description 답글 비율을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetCommentReplyRatio(analyzeStatData: AnalyzeStatType) {
  const query = useGet<CommentReplyRatioItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'reply-ratio',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
