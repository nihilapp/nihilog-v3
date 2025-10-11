import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchTagSubscribeType } from '@/_schemas/tag-subscribe.schema';

/**
 * 태그 구독 관련 쿼리 키 정의
 */
export const tagSubscribeKeys = createQueryKeys('tagSubscribe', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 태그 구독 관련 쿼리 무효화
  tagSubscribeList: (params: SearchTagSubscribeType) => [
    'tagSubscribeList', params,
  ], // 태그 구독 목록 조회 (GET)
  tagSubscribeByNo: (tagNo: number, params: SearchTagSubscribeType) => [
    'tagSubscribeByNo', tagNo, params,
  ], // 특정 태그 구독 상태 조회 (GET)

  // ===== POST Mutations =====
  createTagSubscribe: (tagNo: number) => [
    'createTagSubscribe', tagNo,
  ], // 태그 구독 설정
  createMultipleTagSubscribe: () => [ 'createMultipleTagSubscribe', ], // 다수 태그 일괄 구독

  // ===== PUT Mutations =====
  updateTagSubscribe: (tagSbcrNo: number) => [
    'updateTagSubscribe', tagSbcrNo,
  ], // 태그 구독 설정 변경
  updateMultipleTagSubscribe: () => [ 'updateMultipleTagSubscribe', ], // 다수 태그 구독 설정 일괄 변경

  // ===== DELETE Mutations =====
  deleteTagSubscribe: (tagSbcrNo: number) => [
    'deleteTagSubscribe', tagSbcrNo,
  ], // 태그 구독 해제
  deleteMultipleTagSubscribe: () => [ 'deleteMultipleTagSubscribe', ], // 다수 태그 구독 일괄 해제
});
