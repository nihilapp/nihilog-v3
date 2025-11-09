import type { AnalyzeStatType } from '@nihilog/schemas';
import type { TopUsersByPostCountItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 사용자별 포스트 작성 수 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTopUsersByPostCount(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TopUsersByPostCountItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'top-post-count',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
