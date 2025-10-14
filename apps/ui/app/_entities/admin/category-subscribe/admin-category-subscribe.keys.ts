import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * 관리자 카테고리 구독 관련 쿼리 키 정의
 */
export const adminCategorySubscribeKeys = createQueryKeys('adminCategorySubscribe', {
  // ===== POST Mutations =====
  createMultiple: () => [
    'admin', 'subscribes', 'categories', 'create', 'multiple',
  ], // 다수 카테고리 구독 생성

  // ===== PUT Mutations =====
  updateMultiple: () => [
    'admin', 'subscribes', 'categories', 'update', 'multiple',
  ], // 다수 카테고리 구독 수정

  // ===== DELETE Mutations =====
  deleteMultiple: () => [
    'admin', 'subscribes', 'categories', 'delete', 'multiple',
  ], // 다수 카테고리 구독 삭제
});
