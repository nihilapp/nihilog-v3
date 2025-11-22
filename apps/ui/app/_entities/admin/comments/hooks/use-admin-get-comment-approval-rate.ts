import type { AnalyzeStatType } from '@nihilog/schemas';
import type { CommentApprovalRateItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 댓글 승인율을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetCommentApprovalRate(analyzeStatData: AnalyzeStatType, enabled: boolean = true) {
  const query = useGet<CommentApprovalRateItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'approval-rate',
    ],
    params: analyzeStatData,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
