import type { AnalyzeStatType } from '@nihilog/schemas';
import type { TotalActiveNotificationUsersItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

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
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
