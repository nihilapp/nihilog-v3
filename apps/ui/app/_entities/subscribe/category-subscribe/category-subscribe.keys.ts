import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchCategorySubscribeType } from '@/_schemas/category-subscribe.schema';

/**
 * 카테고리 구독 관련 쿼리 키 정의
 */
export const categorySubscribeKeys = createQueryKeys('categorySubscribe', {
  // ===== GET Queries =====
  search: (searchData: SearchCategorySubscribeType) => [
    'users', 'subscribes', 'categories', 'search', searchData,
  ], // 카테고리 구독 목록 조회 (POST)
  byNo: (ctgryNo: number, params: SearchCategorySubscribeType) => [
    'users', 'subscribes', 'categories', 'by-no', ctgryNo, params,
  ], // 특정 카테고리 구독 상태 조회 (GET)

  // ===== POST Mutations =====
  create: (ctgryNo: number) => [
    'users', 'subscribes', 'categories', 'create', ctgryNo,
  ], // 카테고리 구독 설정
  createMultiple: () => [
    'users', 'subscribes', 'categories', 'create', 'multiple',
  ], // 다수 카테고리 일괄 구독

  // ===== PUT Mutations =====
  update: (ctgrySbcrNo: number) => [
    'users', 'subscribes', 'categories', 'update', ctgrySbcrNo,
  ], // 카테고리 구독 설정 변경
  updateMultiple: () => [
    'users', 'subscribes', 'categories', 'update', 'multiple',
  ], // 다수 카테고리 구독 설정 일괄 변경

  // ===== DELETE Mutations =====
  delete: (ctgrySbcrNo: number) => [
    'users', 'subscribes', 'categories', 'delete', ctgrySbcrNo,
  ], // 카테고리 구독 해제
  deleteMultiple: () => [
    'users', 'subscribes', 'categories', 'delete', 'multiple',
  ], // 다수 카테고리 구독 일괄 해제
});
