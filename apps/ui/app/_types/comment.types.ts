// 댓글 관련 타입 정의 (기본 구조)

export interface CommentInfoType {
  cmntNo: number;
  postNo: number;
  userNo: number;
  prntCmntNo?: number;
  cmntCntn: string;
  cmntStts: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SPAM';
  useYn: 'Y' | 'N';
  delYn: 'Y' | 'N';
  crtNo?: number;
  crtDt: string;
  updtNo?: number;
  updtDt: string;
  delNo?: number;
  delDt?: string;
}

export type SelectCommentType = CommentInfoType;
export type SelectCommentListItemType = CommentInfoType & {
  totalCnt: number;
  rowNo: number;
};

// 통계 관련 타입들 (기본 구조)
export interface AnalyzeCommentStatItemType {
  dateStart: string;
  dateEnd: string;
  commentCount: number;
  approvedCount: number;
  rejectedCount: number;
  spamCount: number;
}

export interface TopPostsByCommentItemType {
  postNo: number;
  postTitle: string;
  commentCount: number;
}

export interface TopUsersByCommentItemType {
  userNo: number;
  userName: string;
  commentCount: number;
}

export interface AverageCommentPerPostItemType {
  averageComments: number;
  totalPosts: number;
  totalComments: number;
}

export interface CommentStatusDistributionItemType {
  status: string;
  count: number;
  ratio: number;
}

export interface CommentApprovalRateItemType {
  approvalRate: number;
  totalComments: number;
  approvedComments: number;
}

export interface CommentSpamRateItemType {
  spamRate: number;
  totalComments: number;
  spamComments: number;
}

export interface CommentReplyRatioItemType {
  replyRatio: number;
  totalComments: number;
  replyComments: number;
}

export interface CommentAverageDepthItemType {
  averageDepth: number;
  totalComments: number;
  maxDepth: number;
}

export interface PostsWithoutCommentsItemType {
  postNo: number;
  postTitle: string;
  postDate: string;
}
