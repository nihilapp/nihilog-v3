// 포스트 관련 타입 정의 (기본 구조)
import type { CategoryInfoType } from './category.types';

export interface PostInfoType {
  pstNo: number;
  pstCd: string;
  userNo: number;
  ctgryNo?: number;
  pstTtl: string;
  pstSmry?: string;
  pstMtxt: string;
  pstThmbLink?: string;
  pstStts: 'EMPTY' | 'WRITING' | 'FINISHED';
  publDt?: string;
  pinYn: 'Y' | 'N';
  rlsYn: 'Y' | 'N';
  archYn: 'Y' | 'N';
  secrYn?: 'Y' | 'N';
  pstPswd?: string;
  useYn: 'Y' | 'N';
  delYn: 'Y' | 'N';
  crtNo?: number;
  crtDt: string;
  updtNo?: number;
  updtDt: string;
  delNo?: number;
  delDt?: string;
}

// 카테고리 정보가 포함된 포스트 타입
export type SelectPostType = PostInfoType & {
  category?: CategoryInfoType | null;
};
export type SelectPostListItemType = SelectPostType & {
  totalCnt: number;
  rowNo: number;
};

// 기타 필요한 타입들 (기본 구조)
export interface PostViewLogType {
  viewLogNo: number;
  pstNo: number;
  userNo?: number;
  viewDt: string;
}

export interface PostShareLogType {
  shareLogNo: number;
  pstNo: number;
  userNo?: number;
  sharePlatform: string;
  shareDt: string;
}

export interface PostBookmarkType {
  bookmarkNo: number;
  pstNo: number;
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

// 포스트와 카테고리 정보가 포함된 북마크 타입
export type SelectPostBookmarkType = PostBookmarkType & {
  post: SelectPostType;
};

export type SelectPostBookmarkListItemType = SelectPostBookmarkType & {
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
  pstNo: number;
  postTitle: string;
  viewCount: number;
  shareCount: number;
  bookmarkCount: number;
}

export interface TopCommentPostItemType {
  pstNo: number;
  postTitle: string;
  commentCount: number;
}

export interface PostStatusRatioItemType {
  status: string;
  count: number;
  ratio: number;
}
