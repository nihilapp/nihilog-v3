import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { SearchUserType } from '@repo/drizzle';

/**
 * 사용자 관련 쿼리 키 정의
 */
export const usersKeys = createQueryKeys('users', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 사용자 관련 쿼리 무효화
  profile: () => [ 'profile', ], // 내 정보 조회
  userByNo: (userNo: number) => [ 'userByNo', userNo, ], // 특정 사용자 조회
  userByEmail: (emlAddr: string) => [ 'userByEmail', emlAddr, ], // 이메일로 사용자 조회

  // ===== POST Mutations =====
  users: (params: SearchUserType) => [ 'users', params, ], // 사용자 목록 조회 (POST)

  // ===== PUT Mutations =====
  updateProfile: () => [ 'updateProfile', ], // 내 정보 수정
});
