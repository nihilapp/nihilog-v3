import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchTagSubscribeType } from '@/_schemas/tag-subscribe.schema';

/**
 * 태그 구독 관련 쿼리 키 정의
 */
export const tagSubscribeKeys = createQueryKeys('tagSubscribe', {
  // ===== GET Queries =====
  search: (searchData: SearchTagSubscribeType) => [
    'users', 'subscribes', 'tags', 'search', searchData,
  ], // 태그 구독 목록 조회 (POST)
  byNo: (tagNo: number, params: SearchTagSubscribeType) => [
    'users', 'subscribes', 'tags', 'by-no', tagNo, params,
  ], // 특정 태그 구독 상태 조회 (GET)

  // ===== POST Mutations =====
  create: (tagNo: number) => [
    'users', 'subscribes', 'tags', 'create', tagNo,
  ], // 태그 구독 설정
  createMultiple: () => [
    'users', 'subscribes', 'tags', 'create', 'multiple',
  ], // 다수 태그 일괄 구독

  // ===== PUT Mutations =====
  update: (tagSbcrNo: number) => [
    'users', 'subscribes', 'tags', 'update', tagSbcrNo,
  ], // 태그 구독 설정 변경
  updateMultiple: () => [
    'users', 'subscribes', 'tags', 'update', 'multiple',
  ], // 다수 태그 구독 설정 일괄 변경

  // ===== DELETE Mutations =====
  delete: (tagSbcrNo: number) => [
    'users', 'subscribes', 'tags', 'delete', tagSbcrNo,
  ], // 태그 구독 해제
  deleteMultiple: () => [
    'users', 'subscribes', 'tags', 'delete', 'multiple',
  ], // 다수 태그 구독 일괄 해제
});
