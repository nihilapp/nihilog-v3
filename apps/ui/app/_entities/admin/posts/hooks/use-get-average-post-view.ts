import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AverageViewStatItemType } from '@/_types';

interface UseGetAveragePostViewOptions extends QueryOptionType<AverageViewStatItemType[]> {}

/**
 * @description 포스트별 평균 조회수를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseGetAveragePostViewOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetAveragePostView(
  analyzeStatData: AnalyzeStatType,
  options: UseGetAveragePostViewOptions = {}
) {
  const query = useGet<AverageViewStatItemType[]>({
    url: [
      'admin',
      'posts',
      'analyze',
      'average-views',
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
