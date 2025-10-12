// 게시글 관련 타입 정의 (기본 구조)

export interface PostInfoType {
  postNo: number;
  postCd: string;
  userNo: number;
  ctgrNo?: number;
  postTtl: string;
  postCntn: string;
  postStts: 'EMPTY' | 'WRITING' | 'FINISHED';
  useYn: 'Y' | 'N';
  delYn: 'Y' | 'N';
  crtNo?: number;
  crtDt: string;
  updtNo?: number;
  updtDt: string;
  delNo?: number;
  delDt?: string;
}

export type SelectPostType = PostInfoType;
export type SelectPostListItemType = PostInfoType & {
  totalCnt: number;
  rowNo: number;
};

// 기타 필요한 타입들 (기본 구조)
export interface PostViewLogType {
  viewLogNo: number;
  postNo: number;
  userNo?: number;
  viewDt: string;
}

export interface PostShareLogType {
  shareLogNo: number;
  postNo: number;
  userNo?: number;
  sharePlatform: string;
  shareDt: string;
}

export interface PostBookmarkType {
  bookmarkNo: number;
  postNo: number;
  userNo: number;
  bookmarkDt: string;
}

export type SelectPostViewLogType = PostViewLogType;
export type SelectPostViewLogListItemType = PostViewLogType & {
  totalCnt: number;
  rowNo: number;
};

export type SelectPostShareLogType = PostShareLogType;
export type SelectPostShareLogListItemType = PostShareLogType & {
  totalCnt: number;
  rowNo: number;
};

export type SelectPostBookmarkType = PostBookmarkType;
export type SelectPostBookmarkListItemType = PostBookmarkType & {
  totalCnt: number;
  rowNo: number;
};

// 통계 관련 타입들 (기본 구조)
export type ViewStatModeType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface ViewStatItemType {
  date: string;
  viewCount: number;
}

export interface SharePlatformStatItemType {
  platform: string;
  count: number;
  ratio: number;
}

export interface AnalyzePostItemType {
  dateStart: string;
  dateEnd: string;
  postCount: number;
  viewCount: number;
  shareCount: number;
  bookmarkCount: number;
}

export interface AverageViewStatItemType {
  averageViews: number;
  totalPosts: number;
  totalViews: number;
}

export interface AverageBookmarkStatItemType {
  averageBookmarks: number;
  totalPosts: number;
  totalBookmarks: number;
}

export interface TopPopularPostItemType {
  postNo: number;
  postTitle: string;
  viewCount: number;
  shareCount: number;
  bookmarkCount: number;
}

export interface TopCommentPostItemType {
  postNo: number;
  postTitle: string;
  commentCount: number;
}

export interface PostStatusRatioItemType {
  status: string;
  count: number;
  ratio: number;
}
