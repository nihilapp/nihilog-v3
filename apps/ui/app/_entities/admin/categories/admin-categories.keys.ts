import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchCategoryType } from '@/_schemas/category.schema';
import type { AnalyzeStatType } from '@/_schemas/common.schema';

/**
 * 관리자 카테고리 관련 쿼리 키 정의
 */
export const adminCategoriesKeys = createQueryKeys('adminCategories', {
  // ===== GET Queries =====
  search: (params: SearchCategoryType) => [
    'admin', 'categories', 'search', params,
  ], // 카테고리 목록 조회 (POST)
  byNo: (ctgryNo: number) => [
    'admin', 'categories', 'by-no', ctgryNo,
  ], // 카테고리 번호로 조회
  byName: (ctgryNm: string) => [
    'admin', 'categories', 'by-name', ctgryNm,
  ], // 카테고리명으로 조회

  // ===== 통계 관련 GET Queries =====
  analyzeTopSubscribers: (limit: number) => [
    'admin', 'categories', 'analyze', 'top-subscribers', limit,
  ], // 구독자 많은 카테고리 TOP N
  analyzeNoSubscribers: () => [
    'admin', 'categories', 'analyze', 'no-subscribers',
  ], // 구독자 없는 카테고리
  analyzeStatusDistribution: () => [
    'admin', 'categories', 'analyze', 'status-distribution',
  ], // 카테고리 상태 분포
  analyzeCreatorStats: () => [
    'admin', 'categories', 'analyze', 'creator-stats',
  ], // 카테고리 생성자 통계
  analyzeUnusedCategories: () => [
    'admin', 'categories', 'analyze', 'unused-categories',
  ], // 미사용 카테고리 목록
  analyzeHierarchyDistribution: () => [
    'admin', 'categories', 'analyze', 'hierarchy-distribution',
  ], // 계층 분포
  analyzeHierarchyPosts: () => [
    'admin', 'categories', 'analyze', 'hierarchy-posts',
  ], // 계층별 포스트 수
  analyzeHierarchySubscribers: () => [
    'admin', 'categories', 'analyze', 'hierarchy-subscribers',
  ], // 계층별 구독자 수

  // ===== POST Mutations (통계) =====
  analyzeOverview: (params: AnalyzeStatType) => [
    'admin', 'categories', 'analyze', 'overview', params,
  ], // 카테고리 분석 통계
  analyzeTopPopularCategories: (limit: number) => [
    'admin', 'categories', 'analyze', 'top-popular-categories', limit,
  ], // 인기 카테고리 지수
  analyzeAverageBookmarks: () => [
    'admin', 'categories', 'analyze', 'average-bookmarks',
  ], // 평균 북마크 수
  analyzeAverageViews: () => [
    'admin', 'categories', 'analyze', 'average-views',
  ], // 평균 조회수
  analyzeSubscriberGrowth: () => [
    'admin', 'categories', 'analyze', 'subscriber-growth',
  ], // 구독자 성장률

  // ===== POST Mutations =====
  create: () => [
    'admin', 'categories', 'create',
  ], // 카테고리 생성
  createMultiple: () => [
    'admin', 'categories', 'create', 'multiple',
  ], // 다수 카테고리 생성

  // ===== PATCH Mutations =====
  update: (ctgryNo: number) => [
    'admin', 'categories', 'update', ctgryNo,
  ], // 카테고리 수정
  updateMultiple: () => [
    'admin', 'categories', 'update', 'multiple',
  ], // 다수 카테고리 수정

  // ===== DELETE Mutations =====
  delete: (ctgryNo: number) => [
    'admin', 'categories', 'delete', ctgryNo,
  ], // 카테고리 삭제
  deleteMultiple: () => [
    'admin', 'categories', 'delete', 'multiple',
  ], // 다수 카테고리 삭제
});
