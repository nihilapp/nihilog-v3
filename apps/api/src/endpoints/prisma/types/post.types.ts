import type { PstBkmrkMpng, PstInfo, PstShrnLog, PstViewLog } from '@prisma/client';

// 단일 게시글 조회
export type SelectPostType = PstInfo;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectPostListItemType = SelectPostType & {
  totalCnt: number;
  rowNo: number;
};

// 단일 게시글 조회 로그
export type SelectPostViewLogType = PstViewLog;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectPostViewLogListItemType = SelectPostViewLogType & {
  totalCnt: number;
  rowNo: number;
};

// 단일 게시글 공유 로그
export type SelectPostShareLogType = PstShrnLog;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectPostShareLogListItemType = SelectPostShareLogType & {
  totalCnt: number;
  rowNo: number;
};

// 단일 게시글 북마크
export type SelectPostBookmarkType = PstBkmrkMpng;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectPostBookmarkListItemType = SelectPostBookmarkType & {
  totalCnt: number;
  rowNo: number;
};

export type ViewStatModeType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type ViewStatItemType = {
  date: string;
  count: number;
};

// 플랫폼별 공유 통계
export type SharePlatformStatItemType = {
  platform: string;
  count: number;
};

export type AnalyzePostItemType = {
  dateStart: string;
  dateEnd: string;
  publishCount: number;
  updateCount: number;
  deleteCount: number;
  viewCount: number;
  bookmarkCount: number;
  shareCount: number;
  commentCount: number;
};

// 게시글 평균 조회수 통계
export type AverageViewStatItemType = {
  dateStart: string;
  dateEnd: string;
  avgViewCount: number;
};

// 게시글당 평균 북마크 수 통계
export type AverageBookmarkStatItemType = {
  dateStart: string;
  dateEnd: string;
  avgBookmarkCount: number;
};

// 인기 게시글 TOP N (조회수 기준)
export type TopPopularPostItemType = {
  pstNo: number;
  title: string;
  viewCount: number;
  publishDate: string;
};

// 댓글 많은 게시글 TOP N
export type TopCommentPostItemType = {
  pstNo: number;
  title: string;
  commentCount: number;
  publishDate: string;
};

// 게시글 상태 비율
export type PostStatusRatioItemType = {
  status: 'EMPTY' | 'WRITING' | 'FINISHED';
  count: number;
  ratio: number;
};
