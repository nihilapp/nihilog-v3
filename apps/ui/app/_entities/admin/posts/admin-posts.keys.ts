import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { SearchPostType } from '@/_schemas/post.schema';

/**
 * 관리자 게시글 관련 쿼리 키 정의
 */
export const adminPostsKeys = createQueryKeys('adminPosts', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 관리자 게시글 관련 쿼리 무효화

  // 게시글 관리
  postList: (params: SearchPostType) => [
    'postList', params,
  ], // 게시글 목록 조회 (POST)
  postByNo: (pstNo: number) => [
    'postByNo', pstNo,
  ], // 게시글 번호로 조회

  // ===== POST Mutations =====
  createPost: () => [ 'createPost', ], // 게시글 생성
  analyzeOverview: (params: AnalyzeStatType) => [
    'analyzeOverview', params,
  ], // 게시글 분석 통계
  analyzeShares: (pstNo?: number) => [
    'analyzeShares', pstNo || 0,
  ], // 공유 분석
  analyzeAverageViews: () => [ 'analyzeAverageViews', ], // 평균 조회수
  analyzeAverageBookmarks: () => [ 'analyzeAverageBookmarks', ], // 평균 북마크 수
  analyzeTopPopularPosts: (limit: number) => [
    'analyzeTopPopularPosts', limit,
  ], // 인기 게시글 TOP N
  analyzeTopCommentPosts: (limit: number) => [
    'analyzeTopCommentPosts', limit,
  ], // 댓글 많은 게시글 TOP N
  analyzeStatusRatio: () => [ 'analyzeStatusRatio', ], // 상태별 비율

  // ===== PUT Mutations =====
  updatePost: (pstNo: number) => [
    'updatePost', pstNo,
  ], // 게시글 수정
  multipleUpdatePost: () => [ 'multipleUpdatePost', ], // 다수 게시글 수정

  // ===== DELETE Mutations =====
  deletePost: (pstNo: number) => [
    'deletePost', pstNo,
  ], // 게시글 삭제
  multipleDeletePost: () => [ 'multipleDeletePost', ], // 다수 게시글 삭제
});
