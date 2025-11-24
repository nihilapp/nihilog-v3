import type { AnalyzeStatType } from '@nihilog/schemas';
import type { AnalyzeCommentStatItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 댓글 분석 통계 데이터를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {number} [pstNo] - 포스트 번호 (선택사항)
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetAnalyzeCommentData(
  analyzeStatData: AnalyzeStatType,
  pstNo?: number,
  enabled: boolean = true
) {
  const query = useGet<AnalyzeCommentStatItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'overview',
    ],
    params: {
      ...analyzeStatData,
      ...(pstNo !== undefined && { pstNo, }),
    },
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
