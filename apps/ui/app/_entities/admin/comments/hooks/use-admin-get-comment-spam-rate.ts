import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { CommentSpamRateItemType } from '@/_types';

/**
 * @description 스팸 댓글 비율을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetCommentSpamRate(analyzeStatData: AnalyzeStatType) {
  const query = useGet<CommentSpamRateItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'spam-rate',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
