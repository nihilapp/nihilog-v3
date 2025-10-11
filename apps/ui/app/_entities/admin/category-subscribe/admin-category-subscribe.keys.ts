import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { CreateCategorySubscribeType, UpdateCategorySubscribeType, DeleteCategorySubscribeType } from '@/_schemas/category-subscribe.schema';

/**
 * 관리자 카테고리 구독 관련 쿼리 키 정의
 */
export const adminCategorySubscribeKeys = createQueryKeys('adminCategorySubscribe', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 관리자 카테고리 구독 관련 쿼리 무효화

  // ===== POST Mutations =====
  createMultipleCategorySubscribes: () => [ 'createMultipleCategorySubscribes', ], // 다수 카테고리 구독 생성

  // ===== PUT Mutations =====
  updateMultipleCategorySubscribes: () => [ 'updateMultipleCategorySubscribes', ], // 다수 카테고리 구독 수정

  // ===== DELETE Mutations =====
  deleteMultipleCategorySubscribes: () => [ 'deleteMultipleCategorySubscribes', ], // 다수 카테고리 구독 삭제
});
