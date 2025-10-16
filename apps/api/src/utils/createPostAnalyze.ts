import { DateTime } from 'luxon';

import type { AnalyzePostItemType, AverageViewStatItemType, AverageBookmarkStatItemType, TopPopularPostItemType, TopCommentPostItemType, PostStatusRatioItemType, SharePlatformStatItemType } from '@/endpoints/prisma/types/post.types';

import { timeToString } from './timeHelper';

export class CreatePostAnalyze {
  static analyzePost() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now),
      dateEnd: timeToString(now),
      publishCount: 1,
      updateCount: 1,
      deleteCount: 1,
      viewCount: 1,
      bookmarkCount: 1,
      shareCount: 1,
      commentCount: 1,
    } as AnalyzePostItemType;
  }

  static averageViewStat() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now),
      dateEnd: timeToString(now.plus({ days: 1, })),
      avgViewCount: 15.5,
    } as AverageViewStatItemType;
  }

  static averageBookmarkStat() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now),
      dateEnd: timeToString(now.plus({ days: 1, })),
      avgBookmarkCount: 3.2,
    } as AverageBookmarkStatItemType;
  }

  static topPopularPost() {
    const now = DateTime.now();

    return {
      pstNo: 1,
      title: '인기 포스트 제목',
      viewCount: 1250,
      publishDate: timeToString(now.minus({ days: 5, })),
    } as TopPopularPostItemType;
  }

  static topCommentPost() {
    const now = DateTime.now();

    return {
      pstNo: 2,
      title: '댓글이 많은 포스트 제목',
      commentCount: 45,
      publishDate: timeToString(now.minus({ days: 3, })),
    } as TopCommentPostItemType;
  }

  static postStatusRatio() {
    return {
      status: 'FINISHED' as const,
      count: 25,
      ratio: 0.75,
    } as PostStatusRatioItemType;
  }

  static sharePlatformStat() {
    return {
      platform: 'twitter',
      count: 50,
    } as SharePlatformStatItemType;
  }
}
