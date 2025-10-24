import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { TopUsersByContributionItemType } from '@/_types';

interface OptionType extends QueryOptionType<TopUsersByContributionItemType[]> {}

/**
 * @description 사용자별 기여도 TOP N을 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTopUsersByContribution(
  analyzeStatData: AnalyzeStatType,
  options: OptionType = {}
) {
  const query = useGet<TopUsersByContributionItemType[]>({
    url: [
      'admin',
      'users',
      'analyze',
      'top-contribution',
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
