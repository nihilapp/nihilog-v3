import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas';
import type { TotalActiveNotificationUsersItemType } from '@/_types';

/**
 * @description 전체 알림 활성 사용자 수 통계를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 */
export function useAdminGetTotalActiveNotificationUsers(analyzeStatData: AnalyzeStatType) {
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
  });

  return query;
}
