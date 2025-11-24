import type { AnalyzeStatType } from '@nihilog/schemas';
import type { AnalyzePostItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 포스트 분석 통계 데이터를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {number} [pstNo] - 포스트 번호 (선택사항)
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetAnalyzePostData(
  analyzeStatData: AnalyzeStatType,
  pstNo?: number,
  enabled: boolean = true
) {
  const query = useGet<AnalyzePostItemType[]>({
    url: [
      'admin',
      'posts',
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
