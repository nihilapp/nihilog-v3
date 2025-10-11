import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { CreateTagSubscribeType, UpdateTagSubscribeType, DeleteTagSubscribeType } from '@/_schemas/tag-subscribe.schema';

/**
 * 관리자 태그 구독 관련 쿼리 키 정의
 */
export const adminTagSubscribeKeys = createQueryKeys('adminTagSubscribe', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 관리자 태그 구독 관련 쿼리 무효화

  // ===== POST Mutations =====
  createMultipleTagSubscribes: () => [ 'createMultipleTagSubscribes', ], // 다수 태그 구독 생성

  // ===== PUT Mutations =====
  updateMultipleTagSubscribes: () => [ 'updateMultipleTagSubscribes', ], // 다수 태그 구독 수정

  // ===== DELETE Mutations =====
  deleteMultipleTagSubscribes: () => [ 'deleteMultipleTagSubscribes', ], // 다수 태그 구독 삭제
});
