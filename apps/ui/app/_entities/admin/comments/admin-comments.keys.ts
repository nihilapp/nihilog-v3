import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchCommentType } from '@/_schemas/comment.schema';
import type { AnalyzeStatType } from '@/_schemas/common.schema';

/**
 * 관리자 댓글 관련 쿼리 키 정의
 */
export const adminCommentsKeys = createQueryKeys(
  'adminComments',
  {
  // ===== GET Queries =====
    search: (params: SearchCommentType) => [
      'admin',
      'comments',
      'search',
      params,
    ], // 댓글 목록 조회 (POST)

    // ===== 통계 관련 GET Queries =====
    analyzeCommentStatusDistribution: () => [
      'admin',
      'comments',
      'analyze',
      'comment-status-distribution',
    ], // 댓글 상태 분포
    analyzePostsWithoutComments: () => [
      'admin',
      'comments',
      'analyze',
      'posts-without-comments',
    ], // 댓글 없는 포스트

    // ===== POST Mutations (통계) =====
    analyzeOverview: (params: AnalyzeStatType) => [
      'admin',
      'comments',
      'analyze',
      'overview',
      params,
    ], // 댓글 분석 통계
    analyzeTopPostsByComments: (limit: number) => [
      'admin',
      'comments',
      'analyze',
      'top-posts-by-comments',
      limit,
    ], // 댓글 많은 포스트 TOP N
    analyzeTopUsersByComments: (limit: number) => [
      'admin',
      'comments',
      'analyze',
      'top-users-by-comments',
      limit,
    ], // 댓글 많은 사용자 TOP N
    analyzeAverageCommentsPerPost: () => [
      'admin',
      'comments',
      'analyze',
      'average-comments-per-post',
    ], // 포스트당 평균 댓글 수
    analyzeCommentApprovalRate: () => [
      'admin',
      'comments',
      'analyze',
      'comment-approval-rate',
    ], // 댓글 승인율
    analyzeCommentSpamRate: () => [
      'admin',
      'comments',
      'analyze',
      'comment-spam-rate',
    ], // 스팸 댓글 비율
    analyzeCommentReplyRatio: () => [
      'admin',
      'comments',
      'analyze',
      'comment-reply-ratio',
    ], // 답글 비율
    analyzeCommentAverageDepth: () => [
      'admin',
      'comments',
      'analyze',
      'comment-average-depth',
    ], // 평균 댓글 깊이

    // ===== PUT Mutations =====
    updateMultiple: () => [
      'admin',
      'comments',
      'update',
      'multiple',
    ], // 다수 댓글 수정

    // ===== DELETE Mutations =====
    deleteMultiple: () => [
      'admin',
      'comments',
      'delete',
      'multiple',
    ], // 다수 댓글 삭제
  }
);
