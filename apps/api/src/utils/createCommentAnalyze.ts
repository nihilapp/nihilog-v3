import { DateTime } from 'luxon';

import type {
  AnalyzeCommentStatItemType,
  TopPostsByCommentItemType,
  TopUsersByCommentItemType,
  AverageCommentPerPostItemType,
  CommentStatusDistributionItemType,
  CommentApprovalRateItemType,
  CommentSpamRateItemType,
  CommentReplyRatioItemType,
  CommentAverageDepthItemType,
  PostsWithoutCommentsItemType
} from '@/endpoints/prisma/types/comment.types';

import { timeToString } from './timeHelper';

export class CreateCommentAnalyze {
  // 기본 통계 (9개 지표 통합)
  static analyzeComment() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now),
      dateEnd: timeToString(now),
      // 댓글 작성/삭제 통계
      newCommentCount: 25,
      deleteCommentCount: 3,
      activeCommentCount: 22,
      // 댓글 상태별 통계
      pendingCommentCount: 5,
      approvedCommentCount: 18,
      rejectedCommentCount: 2,
      spamCommentCount: 1,
      // 댓글 답글 통계
      topLevelCommentCount: 15,
      replyCommentCount: 7,
    } as AnalyzeCommentStatItemType;
  }

  // 1. 댓글 활동 분석 (3개)
  // 포스트별 댓글 수 TOP N
  static topPostsByComment() {
    const now = DateTime.now();

    return {
      pstNo: 1,
      pstTtl: 'React Hook 사용법 완벽 가이드',
      commentCount: 45,
      approvedCommentCount: 42,
      lastCommentDate: timeToString(now.minus({ hours: 2, })),
    } as TopPostsByCommentItemType;
  }

  // 사용자별 댓글 작성 수 TOP N
  static topUsersByComment() {
    const now = DateTime.now();

    return {
      userNo: 1,
      userName: '개발자김씨',
      commentCount: 28,
      approvedCommentCount: 26,
      lastCommentDate: timeToString(now.minus({ hours: 1, })),
    } as TopUsersByCommentItemType;
  }

  // 평균 댓글 수 / 포스트
  static averageCommentPerPost() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      avgCommentCount: 8.5,
    } as AverageCommentPerPostItemType;
  }

  // 2. 댓글 상태 분석 (3개)
  // 댓글 상태별 분포
  static commentStatusDistribution() {
    return {
      status: 'APPROVED' as const,
      count: 18,
      ratio: 0.72,
    } as CommentStatusDistributionItemType;
  }

  // 댓글 승인율
  static commentApprovalRate() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      approvalRate: 0.78, // 78% 승인율
      totalComments: 25,
      approvedComments: 19,
    } as CommentApprovalRateItemType;
  }

  // 스팸 댓글 비율
  static commentSpamRate() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      spamRate: 0.04, // 4% 스팸 비율
      totalComments: 25,
      spamComments: 1,
    } as CommentSpamRateItemType;
  }

  // 3. 댓글 구조 분석 (3개)
  // 답글 비율
  static commentReplyRatio() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      replyRatio: 0.32, // 32% 답글 비율
      totalComments: 25,
      replyComments: 8,
    } as CommentReplyRatioItemType;
  }

  // 평균 답글 깊이
  static commentAverageDepth() {
    const now = DateTime.now();

    return {
      dateStart: timeToString(now.minus({ days: 7, })),
      dateEnd: timeToString(now),
      avgDepth: 1.8,
      maxDepth: 3,
    } as CommentAverageDepthItemType;
  }

  // 댓글 없는 포스트 목록
  static postsWithoutComments() {
    const now = DateTime.now();

    return {
      pstNo: 5,
      pstTtl: '새로운 기술 스택 소개',
      publishDate: timeToString(now.minus({ days: 3, })),
      viewCount: 45,
      daysSincePublish: 3,
    } as PostsWithoutCommentsItemType;
  }
}
