import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { TotalActiveNotificationUsersItemType } from '@/_types';

interface UseGetTotalActiveNotificationUsersOptions extends QueryOptionType<TotalActiveNotificationUsersItemType[]> {}

/**
 * @description 전체 알림 활성 사용자 수 통계를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {UseGetTotalActiveNotificationUsersOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetTotalActiveNotificationUsers(
  analyzeStatData: AnalyzeStatType,
  options: UseGetTotalActiveNotificationUsersOptions = {}
) {
  const query = useGet<TotalActiveNotificationUsersItemType[]>({
    url: [
      'admin',
      'subscribes',
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
