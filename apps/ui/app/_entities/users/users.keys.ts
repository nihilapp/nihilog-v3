import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * 사용자 관련 쿼리 키 정의
 */
export const usersKeys = createQueryKeys('users', {
  // ===== GET Queries =====
  profile: () => [
    'users', 'profile',
  ], // 내 정보 조회
  subscribeInfo: () => [
    'users', 'subscribe',
  ], // 구독 정보 조회

  // ===== POST Mutations =====
  create: () => [
    'users', 'create',
  ], // 사용자 생성

  // ===== PUT Mutations =====
  updateProfile: () => [
    'users', 'update', 'profile',
  ], // 내 정보 수정
  updateSubscribe: () => [
    'users', 'update', 'subscribe',
  ], // 구독 정보 수정

  // ===== DELETE Mutations =====
  deleteProfile: () => [
    'users', 'delete', 'profile',
  ], // 프로필 삭제
});
