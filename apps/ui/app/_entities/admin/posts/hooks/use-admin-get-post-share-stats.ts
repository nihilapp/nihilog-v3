import type { AnalyzeStatType } from '@nihilog/schemas';
import type { SharePlatformStatItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 플랫폼별 공유 통계를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {number} [pstNo] - 포스트 번호 (선택사항)
 */
export function useAdminGetPostShareStats(
  analyzeStatData: AnalyzeStatType,
  pstNo?: number
) {
  const query = useGet<SharePlatformStatItemType[]>({
    url: [
      'admin',
      'posts',
      'analyze',
      'shares',
    ],
    params: {
      ...analyzeStatData,
      pstNo,
    },
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
