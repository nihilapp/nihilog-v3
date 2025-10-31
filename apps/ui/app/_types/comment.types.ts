import type {
  CmntInfoTableType
} from '../_schemas';

export type SelectCommentType = CmntInfoTableType & {
  post: {
    pstNo: number;
  };
  parentComment: CmntInfoTableType | null;
  replies: CmntInfoTableType[];
  creator: {
    userNo: number;
  } | null;
};

export type SelectCommentListItemType = SelectCommentType & {
  totalCnt: number;
  rowNo: number;
};

// ========================================================
// 댓글 통계 관련 타입
// ========================================================

// 댓글 분석 통계 (시간대별 합산) - 9개 지표 통합
// - cmntNo 또는 pstNo 없으면 전체, 있으면 해당 댓글/포스트만
export type AnalyzeCommentStatItemType = {
  dateStart: string;
  dateEnd: string;
  // 댓글 작성/삭제 통계
  newCommentCount: number; // 신규 댓글 작성 수
  deleteCommentCount: number; // 댓글 삭제 수
  activeCommentCount: number; // 활성 댓글 수
  // 댓글 상태별 통계
  pendingCommentCount: number; // 대기 중 댓글 수
  approvedCommentCount: number; // 승인된 댓글 수
  rejectedCommentCount: number; // 거부된 댓글 수
  spamCommentCount: number; // 스팸 댓글 수
  // 댓글 답글 통계
  topLevelCommentCount: number; // 최상위 댓글 수
  replyCommentCount: number; // 답글 수
};

// ========================================================
// 파생 지표 타입 (9개)
// ========================================================

// 1. 댓글 활동 분석 (3개)
// 포스트별 댓글 수 TOP N
export type TopPostsByCommentItemType = {
  pstNo: number;
  pstTtl: string;
  commentCount: number;
  approvedCommentCount: number;
  lastCommentDate: string;
};

// 사용자별 댓글 작성 수 TOP N
export type TopUsersByCommentItemType = {
  userNo: number;
  userName: string;
  commentCount: number;
  approvedCommentCount: number;
  lastCommentDate: string;
};

// 평균 댓글 수 / 포스트
export type AverageCommentPerPostItemType = {
  dateStart: string;
  dateEnd: string;
  avgCommentCount: number;
};

// 2. 댓글 상태 분석 (3개)
// 댓글 상태별 분포
export type CommentStatusDistributionItemType = {
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SPAM';
  count: number;
  ratio: number;
};

// 댓글 승인율
export type CommentApprovalRateItemType = {
  dateStart: string;
  dateEnd: string;
  approvalRate: number; // 승인된 댓글 / 전체 댓글 비율
  totalComments: number;
  approvedComments: number;
};

// 스팸 댓글 비율
export type CommentSpamRateItemType = {
  dateStart: string;
  dateEnd: string;
  spamRate: number; // 스팸 댓글 / 전체 댓글 비율
  totalComments: number;
  spamComments: number;
};

// 3. 댓글 구조 분석 (3개)
// 답글 비율
export type CommentReplyRatioItemType = {
  dateStart: string;
  dateEnd: string;
  replyRatio: number; // 답글 수 / 전체 댓글 수 비율
  totalComments: number;
  replyComments: number;
};

// 평균 답글 깊이
export type CommentAverageDepthItemType = {
  dateStart: string;
  dateEnd: string;
  avgDepth: number;
  maxDepth: number;
};

// 댓글 없는 포스트 목록
export type PostsWithoutCommentsItemType = {
  pstNo: number;
  pstTtl: string;
  publishDate: string;
  viewCount: number;
  daysSincePublish: number;
};
