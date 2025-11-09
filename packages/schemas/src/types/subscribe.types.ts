import type { Prisma } from '@nihilog/db';

// 기존 구독 설정 관련 타입

/**
 * @description 단일 구독 설정 조회 (user 정보 포함)
 */
export type SelectUserSbcrInfoType = Prisma.UserSbcrInfoGetPayload<{
  include: {
    user: {
      select: {
        userNm: true;
        emlAddr: true;
      };
    };
  };
}>;

/**
 * @description 목록 조회 항목 (페이징 정보 포함)
 */
export type SelectUserSbcrInfoListItemType = SelectUserSbcrInfoType & {
  totalCnt: number;
  rowNo: number;
};

// 구독 설정 통계 관련 타입

/**
 * @description 구독 설정 분석 통계 (시간대별 합산) - 6개 지표 통합
 */
export type AnalyzeSubscribeStatItemType = {
  dateStart: string;
  dateEnd: string;
  // 구독 생성/삭제 통계
  newSubscriptionCount: number; // 신규 구독 설정 수
  deleteSubscriptionCount: number; // 구독 설정 삭제 수
  activeSubscriptionCount: number; // 활성 구독 설정 수
  // 알림 설정별 통계
  emailNotificationCount: number; // 이메일 알림 활성 수
  newPostNotificationCount: number; // 새 포스트 알림 활성 수
  commentReplyNotificationCount: number; // 댓글 답글 알림 활성 수
};

// 구독 설정 파생 지표 타입 (3개)

/**
 * @description 알림 설정별 분포
 */
export type SubscribeNotificationDistributionItemType = {
  notificationType: 'EMAIL' | 'NEW_POST' | 'COMMENT_REPLY';
  activeCount: number;
  inactiveCount: number;
  totalCount: number;
  activeRatio: number;
};

/**
 * @description 전체 알림 활성 사용자 수
 */
export type TotalActiveNotificationUsersItemType = {
  dateStart: string;
  dateEnd: string;
  totalActiveUsers: number;
  emailActiveUsers: number;
  newPostActiveUsers: number;
  commentReplyActiveUsers: number;
  allNotificationsActiveUsers: number;
};

/**
 * @description 전체 알림 비활성 사용자 수
 */
export type TotalInactiveNotificationUsersItemType = {
  dateStart: string;
  dateEnd: string;
  totalInactiveUsers: number;
  emailInactiveUsers: number;
  newPostInactiveUsers: number;
  commentReplyInactiveUsers: number;
  allNotificationsInactiveUsers: number;
};
