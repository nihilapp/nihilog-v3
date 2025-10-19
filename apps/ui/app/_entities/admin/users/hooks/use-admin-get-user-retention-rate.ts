import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { UserRetentionRateItemType } from '@/_types';

interface UseAdminGetUserRetentionRateOptions extends QueryOptionType<UserRetentionRateItemType[]> {}

/**
 * @description 사용자 유지율을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseAdminGetUserRetentionRateOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetUserRetentionRate(
  analyzeStatData: AnalyzeStatType,
  options: UseAdminGetUserRetentionRateOptions = {}
) {
  const query = useGet<UserRetentionRateItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'retention-rate',
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
