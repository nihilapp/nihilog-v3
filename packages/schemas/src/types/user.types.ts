import type { UserInfo } from '@nihilog/db';

/**
 * @description 단일 사용자 조회
 */
export type SelectUserInfoType = UserInfo;

/**
 * @description 목록 조회 항목 (페이징 정보 포함)
 */
export type SelectUserInfoListItemType = UserInfo & {
  totalCnt: number;
  rowNo: number;
};

// 사용자 통계 관련 타입

/**
 * @description 사용자 분석 통계 (9개 지표 통합)
 */
export type AnalyzeUserStatItemType = {
  dateStart: string;
  dateEnd: string;
  newUserCount: number;
  deleteUserCount: number;
  activeUserCount: number;
  loginCount: number;
  postWriteCount: number;
  commentWriteCount: number;
  bookmarkAddCount: number;
  tagSubscribeCount: number;
  categorySubscribeCount: number;
};

/**
 * @description 활성 사용자 분석
 */
export type ActiveUserAnalysisItemType = {
  period: string;
  activeUserCount: number;
  totalUserCount: number;
  activeUserRatio: number;
};

/**
 * @description 사용자별 기여도 TOP N
 */
export type TopUsersByContributionItemType = {
  userNo: number;
  userName: string;
  emailAddress: string;
  contributionIndex: number;
  postCount: number;
  commentCount: number;
  bookmarkCount: number;
  lastActivityDate: string;
};

/**
 * @description 사용자별 포스트 작성 수 TOP N
 */
export type TopUsersByPostCountItemType = {
  userNo: number;
  userName: string;
  emailAddress: string;
  postCount: number;
  lastPostDate: string;
};

/**
 * @description 사용자별 댓글 작성 수 TOP N
 */
export type TopUsersByCommentCountItemType = {
  userNo: number;
  userName: string;
  emailAddress: string;
  commentCount: number;
  lastCommentDate: string;
};

/**
 * @description 역할별 사용자 분포
 */
export type UserRoleDistributionItemType = {
  role: string;
  count: number;
  ratio: number;
};

/**
 * @description 상태별 사용자 분포
 */
export type UserStatusDistributionItemType = {
  status: string;
  count: number;
  ratio: number;
};

/**
 * @description 비활성 사용자 목록
 */
export type InactiveUsersListItemType = {
  userNo: number;
  userName: string;
  emailAddress: string;
  lastLoginDate: string;
  daysSinceLastLogin: number;
};

/**
 * @description 사용자 성장률
 */
export type UserGrowthRateItemType = {
  dateStart: string;
  dateEnd: string;
  growthRate: number;
  previousUserCount: number;
  currentUserCount: number;
};

/**
 * @description 사용자 유지율
 */
export type UserRetentionRateItemType = {
  period: string;
  retentionRate: number;
  totalSignups: number;
  activeUsers: number;
};
