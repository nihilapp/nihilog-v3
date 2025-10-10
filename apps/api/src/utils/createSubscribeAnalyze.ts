import { DateTime } from 'luxon';

import type {
  AnalyzeSubscribeStatItemType,
  SubscribeNotificationDistributionItemType,
  TotalActiveNotificationUsersItemType,
  TotalInactiveNotificationUsersItemType
} from '@/endpoints/prisma/types/subscribe.types';

import { timeToString } from './timeHelper';

export class CreateSubscribeAnalyze {
  // 기본 통계 (6개 지표 통합)
  static analyzeSubscribe() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now),
      dateEnd: timeToString(now),
      // 구독 생성/삭제 통계
      newSubscriptionCount: 15,
      deleteSubscriptionCount: 2,
      activeSubscriptionCount: 13,
      // 알림 설정별 통계
      emailNotificationCount: 12,
      newPostNotificationCount: 10,
      commentReplyNotificationCount: 8,
    } as AnalyzeSubscribeStatItemType;
  }

  // 파생 지표 (3개)
  // 알림 설정별 분포
  static subscribeNotificationDistribution() {
    return {
      notificationType: 'EMAIL' as const,
      activeCount: 12,
      inactiveCount: 3,
      totalCount: 15,
      activeRatio: 0.8,
    } as SubscribeNotificationDistributionItemType;
  }

  // 전체 알림 활성 사용자 수
  static totalActiveNotificationUsers() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      totalActiveUsers: 45,
      emailActiveUsers: 42,
      newPostActiveUsers: 38,
      commentReplyActiveUsers: 35,
      allNotificationsActiveUsers: 30,
    } as TotalActiveNotificationUsersItemType;
  }

  // 전체 알림 비활성 사용자 수
  static totalInactiveNotificationUsers() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      totalInactiveUsers: 15,
      emailInactiveUsers: 18,
      newPostInactiveUsers: 22,
      commentReplyInactiveUsers: 25,
      allNotificationsInactiveUsers: 30,
    } as TotalInactiveNotificationUsersItemType;
  }
}
