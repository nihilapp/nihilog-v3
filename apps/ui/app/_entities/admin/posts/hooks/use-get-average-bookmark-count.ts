import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { AverageBookmarkStatItemType } from '@/_types';

interface UseGetAverageBookmarkCountOptions extends QueryOptionType<AverageBookmarkStatItemType[]> {}

/**
 * @description 포스트당 평균 북마크 수를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseGetAverageBookmarkCountOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetAverageBookmarkCount(
  analyzeStatData: AnalyzeStatType,
  options: UseGetAverageBookmarkCountOptions = {}
) {
  const query = useGet<AverageBookmarkStatItemType[]>({
    url: [
      'admin',
      'posts',
      'analyze',
      'average-bookmarks',
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
