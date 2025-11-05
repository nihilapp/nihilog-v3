import { useGet } from '@/_entities/common/hooks';
import type { AnalyzeStatType } from '@/_schemas';
import type { TopUsersByCommentItemType } from '@/_types';

/**
 * @description 사용자별 댓글 작성 수 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTopUsersByComment(analyzeStatData: AnalyzeStatType) {
  const query = useGet<TopUsersByCommentItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'top-users',
    ],
    params: analyzeStatData,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
