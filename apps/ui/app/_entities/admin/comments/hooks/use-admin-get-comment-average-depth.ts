import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { CommentAverageDepthItemType } from '@/_types';

interface OptionType extends QueryOptionType<CommentAverageDepthItemType[]> {}

/**
 * @description 평균 답글 깊이를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetCommentAverageDepth(
  analyzeStatData: AnalyzeStatType,
  options: OptionType = {}
) {
  const query = useGet<CommentAverageDepthItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'average-depth',
    ],
    params: analyzeStatData,
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
    ...options,
  });

  return query;
}
