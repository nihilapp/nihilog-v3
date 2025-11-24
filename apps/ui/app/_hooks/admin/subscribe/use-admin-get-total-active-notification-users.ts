import type { AnalyzeStatType } from '@nihilog/schemas';
import type { TotalActiveNotificationUsersItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 전체 알림 활성 사용자 수 통계를 조회하는 커스텀 훅
 * @param {AnalyzeStatType} analyzeStatData - 분석 통계 데이터
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetTotalActiveNotificationUsers(analyzeStatData: AnalyzeStatType, enabled: boolean = true) {
  const query = useGet<TotalActiveNotificationUsersItemType[]>({
    url: [
      'admin',
      'subscribes',
      'analyze',
      'active-users',
    ],
    params: analyzeStatData,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
