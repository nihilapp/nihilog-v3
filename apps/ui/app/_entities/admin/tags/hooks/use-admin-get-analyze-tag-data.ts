import type { AnalyzeStatType } from '@nihilog/schemas';
import type { AnalyzeTagStatItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그 분석 통계 데이터를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {number} [tagNo] - 태그 번호 (선택사항)
 */
export function useAdminGetAnalyzeTagData(
  analyzeStatData: AnalyzeStatType,
  tagNo?: number
) {
  const query = useGet<AnalyzeTagStatItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'overview',
    ],
    params: {
      ...analyzeStatData,
      ...(tagNo !== undefined && { tagNo, }),
    },
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
