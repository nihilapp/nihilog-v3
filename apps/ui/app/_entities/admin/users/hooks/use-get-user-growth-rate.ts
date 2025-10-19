import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { UserGrowthRateItemType } from '@/_types';

interface UseGetUserGrowthRateOptions extends QueryOptionType<UserGrowthRateItemType[]> {}

/**
 * @description 사용자 성장률을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseGetUserGrowthRateOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetUserGrowthRate(
  analyzeStatData: AnalyzeStatType,
  options: UseGetUserGrowthRateOptions = {}
) {
  const query = useGet<UserGrowthRateItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'growth-rate',
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
