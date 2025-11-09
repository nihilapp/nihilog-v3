import type { AnalyzeStatType } from '@nihilog/schemas';
import type { CommentApprovalRateItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 댓글 승인율을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetCommentApprovalRate(analyzeStatData: AnalyzeStatType) {
  const query = useGet<CommentApprovalRateItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'approval-rate',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
