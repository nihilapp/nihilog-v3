import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * 관리자 태그 구독 관련 쿼리 키 정의
 */
export const adminTagSubscribeKeys = createQueryKeys('adminTagSubscribe', {
  // ===== POST Mutations =====
  createMultiple: () => [
    'admin', 'subscribes', 'tags', 'create', 'multiple',
  ], // 다수 태그 구독 생성

  // ===== PUT Mutations =====
  updateMultiple: () => [
    'admin', 'subscribes', 'tags', 'update', 'multiple',
  ], // 다수 태그 구독 수정

  // ===== DELETE Mutations =====
  deleteMultiple: () => [
    'admin', 'subscribes', 'tags', 'delete', 'multiple',
  ], // 다수 태그 구독 삭제
});
