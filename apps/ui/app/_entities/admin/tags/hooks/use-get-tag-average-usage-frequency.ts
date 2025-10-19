import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { TagAverageUsageFrequencyItemType } from '@/_types';

interface UseGetTagAverageUsageFrequencyOptions extends QueryOptionType<TagAverageUsageFrequencyItemType[]> {}

/**
 * @description 태그별 평균 사용 빈도를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseGetTagAverageUsageFrequencyOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetTagAverageUsageFrequency(
  analyzeStatData: AnalyzeStatType,
  options: UseGetTagAverageUsageFrequencyOptions = {}
) {
  const query = useGet<TagAverageUsageFrequencyItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'frequency',
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
