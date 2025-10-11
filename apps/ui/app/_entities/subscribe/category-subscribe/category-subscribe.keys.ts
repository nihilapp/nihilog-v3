import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchCategorySubscribeType } from '@/_schemas/category-subscribe.schema';

/**
 * 카테고리 구독 관련 쿼리 키 정의
 */
export const categorySubscribeKeys = createQueryKeys('categorySubscribe', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 카테고리 구독 관련 쿼리 무효화
  categorySubscribeList: (params: SearchCategorySubscribeType) => [
    'categorySubscribeList', params,
  ], // 카테고리 구독 목록 조회 (GET)
  categorySubscribeByNo: (ctgryNo: number, params: SearchCategorySubscribeType) => [
    'categorySubscribeByNo', ctgryNo, params,
  ], // 특정 카테고리 구독 상태 조회 (GET)

  // ===== POST Mutations =====
  createCategorySubscribe: (ctgryNo: number) => [
    'createCategorySubscribe', ctgryNo,
  ], // 카테고리 구독 설정
  createMultipleCategorySubscribe: () => [ 'createMultipleCategorySubscribe', ], // 다수 카테고리 일괄 구독

  // ===== PUT Mutations =====
  updateCategorySubscribe: (ctgrySbcrNo: number) => [
    'updateCategorySubscribe', ctgrySbcrNo,
  ], // 카테고리 구독 설정 변경
  updateMultipleCategorySubscribe: () => [ 'updateMultipleCategorySubscribe', ], // 다수 카테고리 구독 설정 일괄 변경

  // ===== DELETE Mutations =====
  deleteCategorySubscribe: (ctgrySbcrNo: number) => [
    'deleteCategorySubscribe', ctgrySbcrNo,
  ], // 카테고리 구독 해제
  deleteMultipleCategorySubscribe: () => [ 'deleteMultipleCategorySubscribe', ], // 다수 카테고리 구독 일괄 해제
});
