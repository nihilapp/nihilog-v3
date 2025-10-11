// 구독 관련 타입 정의 (API 응답에 맞게)

// 사용자 구독 정보 타입
export interface UserSubscribeInfoType {
  sbcrNo: number;
  userNo: number;
  emlNtfyYn: 'Y' | 'N';
  newPstNtfyYn: 'Y' | 'N';
  cmntRplNtfyYn: 'Y' | 'N';
  useYn: 'Y' | 'N';
  delYn: 'Y' | 'N';
  crtNo?: number;
  crtDt: string;
  updtNo?: number;
  updtDt: string;
  delNo?: number;
  delDt?: string;
}

// 단일 사용자 구독 조회 (API에서 사용하는 타입명)
export type SelectUserSbcrInfoType = UserSubscribeInfoType;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectUserSubscribeInfoListItemType = UserSubscribeInfoType & {
  totalCnt: number;
  rowNo: number;
};

// ========================================================
// 구독 통계 관련 타입
// ========================================================

// 구독 분석 통계
export type AnalyzeSubscribeStatItemType = {
  dateStart: string;
  dateEnd: string;
  newSubscribeCount: number;
  deleteSubscribeCount: number;
  activeSubscribeCount: number;
  emailNotificationCount: number;
  newPostNotificationCount: number;
  commentReplyNotificationCount: number;
};

// 구독 알림 분포
export type SubscribeNotificationDistributionItemType = {
  notificationType: string;
  count: number;
  ratio: number;
};

// 활성 알림 사용자 총계
export type TotalActiveNotificationUsersItemType = {
  totalActiveUsers: number;
  emailNotificationUsers: number;
  newPostNotificationUsers: number;
  commentReplyNotificationUsers: number;
};

// 비활성 알림 사용자 총계
export type TotalInactiveNotificationUsersItemType = {
  totalInactiveUsers: number;
  inactiveEmailNotificationUsers: number;
  inactiveNewPostNotificationUsers: number;
  inactiveCommentReplyNotificationUsers: number;
};
