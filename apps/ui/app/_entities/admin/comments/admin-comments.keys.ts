import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchCommentType, UpdateCommentType } from '@/_schemas/comment.schema';
import type { AnalyzeStatType } from '@/_schemas/common.schema';

/**
 * 관리자 댓글 관련 쿼리 키 정의
 */
export const adminCommentsKeys = createQueryKeys('adminComments', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 관리자 댓글 관련 쿼리 무효화

  // 댓글 관리
  commentList: (params: SearchCommentType) => [
    'commentList', params,
  ], // 댓글 목록 조회 (POST)

  // ===== 통계 관련 GET Queries =====
  analyzeCommentStatusDistribution: () => [ 'analyzeCommentStatusDistribution', ], // 댓글 상태 분포
  analyzePostsWithoutComments: () => [ 'analyzePostsWithoutComments', ], // 댓글 없는 게시글

  // ===== POST Mutations =====
  analyzeOverview: (params: AnalyzeStatType) => [
    'analyzeOverview', params,
  ], // 댓글 분석 통계
  analyzeTopPostsByComments: (limit: number) => [
    'analyzeTopPostsByComments', limit,
  ], // 댓글 많은 게시글 TOP N
  analyzeTopUsersByComments: (limit: number) => [
    'analyzeTopUsersByComments', limit,
  ], // 댓글 많은 사용자 TOP N
  analyzeAverageCommentsPerPost: () => [ 'analyzeAverageCommentsPerPost', ], // 게시글당 평균 댓글 수
  analyzeCommentApprovalRate: () => [ 'analyzeCommentApprovalRate', ], // 댓글 승인율
  analyzeCommentSpamRate: () => [ 'analyzeCommentSpamRate', ], // 스팸 댓글 비율
  analyzeCommentReplyRatio: () => [ 'analyzeCommentReplyRatio', ], // 답글 비율
  analyzeCommentAverageDepth: () => [ 'analyzeCommentAverageDepth', ], // 평균 댓글 깊이

  // ===== PUT Mutations =====
  updateMultipleComments: () => [ 'updateMultipleComments', ], // 다수 댓글 수정

  // ===== DELETE Mutations =====
  deleteMultipleComments: () => [ 'deleteMultipleComments', ], // 다수 댓글 삭제
});
