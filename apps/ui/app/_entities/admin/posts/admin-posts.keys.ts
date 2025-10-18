import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { SearchPostType } from '@/_schemas/post.schema';

/**
 * 관리자 포스트 관련 쿼리 키 정의
 */
export const adminPostsKeys = createQueryKeys(
  'adminPosts',
  {
  // ===== GET Queries =====
    search: (params: SearchPostType) => [
      'admin',
      'posts',
      'search',
      params,
    ], // 포스트 목록 조회 (POST)
    byNo: (pstNo: number) => [
      'admin',
      'posts',
      'by-no',
      pstNo,
    ], // 포스트 번호로 조회

    // ===== 통계 관련 GET Queries =====
    analyzeAverageViews: () => [
      'admin',
      'posts',
      'analyze',
      'average-views',
    ], // 평균 조회수
    analyzeAverageBookmarks: () => [
      'admin',
      'posts',
      'analyze',
      'average-bookmarks',
    ], // 평균 북마크 수
    analyzeStatusRatio: () => [
      'admin',
      'posts',
      'analyze',
      'status-ratio',
    ], // 상태별 비율

    // ===== POST Mutations (통계) =====
    analyzeOverview: (params: AnalyzeStatType) => [
      'admin',
      'posts',
      'analyze',
      'overview',
      params,
    ], // 포스트 분석 통계
    analyzeShares: (pstNo?: number) => [
      'admin',
      'posts',
      'analyze',
      'shares',
      pstNo || 0,
    ], // 공유 분석
    analyzeTopPopularPosts: (limit: number) => [
      'admin',
      'posts',
      'analyze',
      'top-popular-posts',
      limit,
    ], // 인기 포스트 TOP N
    analyzeTopCommentPosts: (limit: number) => [
      'admin',
      'posts',
      'analyze',
      'top-comment-posts',
      limit,
    ], // 댓글 많은 포스트 TOP N

    // ===== POST Mutations =====
    create: () => [
      'admin',
      'posts',
      'create',
    ], // 포스트 생성

    // ===== PUT Mutations =====
    update: (pstNo: number) => [
      'admin',
      'posts',
      'update',
      pstNo,
    ], // 포스트 수정
    updateMultiple: () => [
      'admin',
      'posts',
      'update',
      'multiple',
    ], // 다수 포스트 수정

    // ===== DELETE Mutations =====
    delete: (pstNo: number) => [
      'admin',
      'posts',
      'delete',
      pstNo,
    ], // 포스트 삭제
    deleteMultiple: () => [
      'admin',
      'posts',
      'delete',
      'multiple',
    ], // 다수 포스트 삭제
  }
);
