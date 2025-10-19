import type { PstShrnLog, PstViewLog } from '@prisma/client';
import type { Prisma } from '@prisma/client';

// 단일 포스트 조회 (카테고리 포함)
export type SelectPostType = Prisma.PstInfoGetPayload<{
  include: {
    category: true;
  };
}>;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectPostListItemType = SelectPostType & {
  totalCnt: number;
  rowNo: number;
};

// 단일 포스트 조회 로그
export type SelectPostViewLogType = PstViewLog;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectPostViewLogListItemType = SelectPostViewLogType & {
  totalCnt: number;
  rowNo: number;
};

// 단일 포스트 공유 로그
export type SelectPostShareLogType = PstShrnLog;

// 목록 조회 항목 (페이징 정보 포함)
export type SelectPostShareLogListItemType = SelectPostShareLogType & {
  totalCnt: number;
  rowNo: number;
};

// 단일 포스트 북마크 (포스트와 카테고리 포함)
export type SelectPostBookmarkType = Prisma.PstBkmrkMpngGetPayload<{
  include: {
    post: {
      include: {
        category: true;
      };
    };
  };
}>;

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

// 포스트 평균 조회수 통계
export type AverageViewStatItemType = {
  dateStart: string;
  dateEnd: string;
  avgViewCount: number;
};

// 포스트당 평균 북마크 수 통계
export type AverageBookmarkStatItemType = {
  dateStart: string;
  dateEnd: string;
  avgBookmarkCount: number;
};

// 인기 포스트 TOP N (조회수 기준)
export type TopPopularPostItemType = {
  pstNo: number;
  title: string;
  viewCount: number;
  publishDate: string;
};

// 댓글 많은 포스트 TOP N
export type TopCommentPostItemType = {
  pstNo: number;
  title: string;
  commentCount: number;
  publishDate: string;
};

// 포스트 상태 비율
export type PostStatusRatioItemType = {
  status: 'EMPTY' | 'WRITING' | 'FINISHED';
  count: number;
  ratio: number;
};
