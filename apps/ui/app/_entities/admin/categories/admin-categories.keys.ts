import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { AnalyzeStatType } from '@/_schemas/common.schema';

/**
 * 관리자 카테고리 관련 쿼리 키 정의
 */
export const adminCategoriesKeys = createQueryKeys('adminCategories', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 관리자 카테고리 관련 쿼리 무효화

  // 카테고리 관리
  searchCategories: () => [ 'searchCategories', ], // 카테고리 목록 조회 (POST)
  categoryByNo: (ctgryNo: number) => [
    'categoryByNo', ctgryNo,
  ], // 카테고리 번호로 조회
  categoryByName: (ctgryNm: string) => [
    'categoryByName', ctgryNm,
  ], // 카테고리명으로 조회

  // ===== 통계 관련 GET Queries =====
  analyzeTopSubscribers: (limit: number) => [
    'analyzeTopSubscribers', limit,
  ], // 구독자 많은 카테고리 TOP N
  analyzeNoSubscribers: () => [ 'analyzeNoSubscribers', ], // 구독자 없는 카테고리
  analyzeStatusDistribution: () => [ 'analyzeStatusDistribution', ], // 카테고리 상태 분포
  analyzeCreatorStats: () => [ 'analyzeCreatorStats', ], // 카테고리 생성자 통계
  analyzeUnusedCategories: () => [ 'analyzeUnusedCategories', ], // 미사용 카테고리 목록
  analyzeHierarchyDistribution: () => [ 'analyzeHierarchyDistribution', ], // 계층 분포
  analyzeHierarchyPosts: () => [ 'analyzeHierarchyPosts', ], // 계층별 게시글 수
  analyzeHierarchySubscribers: () => [ 'analyzeHierarchySubscribers', ], // 계층별 구독자 수

  // ===== POST Mutations =====
  createCategory: () => [ 'createCategory', ], // 카테고리 생성
  createMultipleCategories: () => [ 'createMultipleCategories', ], // 다수 카테고리 생성
  analyzeOverview: (params: AnalyzeStatType) => [
    'analyzeOverview', params,
  ], // 카테고리 분석 통계
  analyzeTopPopularCategories: (limit: number) => [
    'analyzeTopPopularCategories', limit,
  ], // 인기 카테고리 지수
  analyzeAverageBookmarks: () => [ 'analyzeAverageBookmarks', ], // 평균 북마크 수
  analyzeAverageViews: () => [ 'analyzeAverageViews', ], // 평균 조회수
  analyzeSubscriberGrowth: () => [ 'analyzeSubscriberGrowth', ], // 구독자 성장률

  // ===== PATCH Mutations =====
  updateCategory: (ctgryNo: number) => [
    'updateCategory', ctgryNo,
  ], // 카테고리 수정
  updateMultipleCategories: () => [ 'updateMultipleCategories', ], // 다수 카테고리 수정

  // ===== DELETE Mutations =====
  deleteCategory: (ctgryNo: number) => [
    'deleteCategory', ctgryNo,
  ], // 카테고리 삭제
  deleteMultipleCategories: () => [ 'deleteMultipleCategories', ], // 다수 카테고리 삭제
});
