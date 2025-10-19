import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { TagUsageTrendItemType } from '@/_types';

interface UseGetTagUsageTrendOptions extends QueryOptionType<TagUsageTrendItemType[]> {}

/**
 * @description 태그별 사용 추이를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseGetTagUsageTrendOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetTagUsageTrend(
  analyzeStatData: AnalyzeStatType,
  options: UseGetTagUsageTrendOptions = {}
) {
  const query = useGet<TagUsageTrendItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'usage-trend',
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
