import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { ActiveUserAnalysisItemType } from '@/_types';

interface OptionType extends QueryOptionType<ActiveUserAnalysisItemType[]> {}

/**
 * @description 활성 사용자 분석을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetActiveUserAnalysis(
  analyzeStatData: AnalyzeStatType,
  options: OptionType = {}
) {
  const query = useGet<ActiveUserAnalysisItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'active-users',
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
