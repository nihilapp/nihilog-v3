import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * 사용자 관련 쿼리 키 정의
 */
export const usersKeys = createQueryKeys('users', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 사용자 관련 쿼리 무효화
  profile: () => [ 'profile', ], // 내 정보 조회
  subscribe: () => [ 'subscribe', ], // 구독 정보 조회

  // ===== POST Mutations =====
  createUser: () => [ 'createUser', ], // 사용자 생성

  // ===== PUT Mutations =====
  updateProfile: () => [ 'updateProfile', ], // 내 정보 수정
  updateSubscribe: () => [ 'updateSubscribe', ], // 구독 정보 수정

  // ===== DELETE Mutations =====
  deleteProfile: () => [ 'deleteProfile', ], // 프로필 삭제
});
