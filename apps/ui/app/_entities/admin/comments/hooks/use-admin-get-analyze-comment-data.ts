import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { AnalyzeCommentStatItemType } from '@/_types';

/**
 * @description 댓글 분석 통계 데이터를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {number} [pstNo] - 포스트 번호 (선택사항)
 */
export function useAdminGetAnalyzeCommentData(
  analyzeStatData: AnalyzeStatType,
  pstNo?: number
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
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
