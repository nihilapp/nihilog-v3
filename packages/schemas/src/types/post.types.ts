import type { PstShrnLog, PstViewLog, Prisma } from '@nihilog/db';

/**
 * @description 단일 포스트 조회 (카테고리 포함)
 */
export type SelectPostType = Prisma.PstInfoGetPayload<{
  include: {
    category: true;
  };
}>;

/**
 * @description 목록 조회 항목 (페이징 정보 포함)
 */
export type SelectPostListItemType = SelectPostType & {
  totalCnt: number;
  rowNo: number;
};

/**
 * @description 단일 포스트 조회 로그
 */
export type SelectPostViewLogType = PstViewLog;

/**
 * @description 목록 조회 항목 (페이징 정보 포함)
 */
export type SelectPostViewLogListItemType = SelectPostViewLogType & {
  totalCnt: number;
  rowNo: number;
};

/**
 * @description 단일 포스트 공유 로그
 */
export type SelectPostShareLogType = PstShrnLog;

/**
 * @description 목록 조회 항목 (페이징 정보 포함)
 */
export type SelectPostShareLogListItemType = SelectPostShareLogType & {
  totalCnt: number;
  rowNo: number;
};

/**
 * @description 단일 포스트 북마크 (포스트와 카테고리 포함)
 */
export type SelectPostBookmarkType = Prisma.PstBkmrkMpngGetPayload<{
  include: {
    post: {
      include: {
        category: true;
      };
    };
  };
}>;

/**
 * @description 목록 조회 항목 (페이징 정보 포함)
 */
export type SelectPostBookmarkListItemType = SelectPostBookmarkType & {
  totalCnt: number;
  rowNo: number;
};

export type ViewStatModeType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type ViewStatItemType = {
  date: string;
  count: number;
};

/**
 * @description 플랫폼별 공유 통계
 */
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

/**
 * @description 포스트 평균 조회수 통계
 */
export type AverageViewStatItemType = {
  dateStart: string;
  dateEnd: string;
  avgViewCount: number;
};

/**
 * @description 포스트당 평균 북마크 수 통계
 */
export type AverageBookmarkStatItemType = {
  dateStart: string;
  dateEnd: string;
  avgBookmarkCount: number;
};

/**
 * @description 인기 포스트 TOP N (조회수 기준)
 */
export type TopPopularPostItemType = {
  pstNo: number;
  title: string;
  viewCount: number;
  publishDate: string;
};

/**
 * @description 댓글 많은 포스트 TOP N
 */
export type TopCommentPostItemType = {
  pstNo: number;
  title: string;
  commentCount: number;
  publishDate: string;
};

/**
 * @description 포스트 상태 비율
 */
export type PostStatusRatioItemType = {
  status: 'EMPTY' | 'WRITING' | 'FINISHED';
  count: number;
  ratio: number;
};
