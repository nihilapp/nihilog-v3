import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_types';
import type { AverageCommentPerPostItemType } from '@/_types';

interface OptionType extends QueryOptionType<AverageCommentPerPostItemType[]> {}

/**
 * @description 평균 댓글 수 / 포스트를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetAverageCommentCount(
  analyzeStatData: AnalyzeStatType,
  options: OptionType = {}
) {
  const query = useGet<AverageCommentPerPostItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'average-per-post',
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
