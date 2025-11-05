import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { PostStatusRatioItemType } from '@/_types';

/**
 * @description 포스트 상태 비율을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetPostStatusRatio(analyzeStatData: AnalyzeStatType) {
  const query = useGet<PostStatusRatioItemType[]>({
    url: [
      'admin',
      'posts',
      'analyze',
      'status-ratio',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
