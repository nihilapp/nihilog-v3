import { createQueryKeys } from '@lukemorales/query-key-factory';

export const adminKeys = createQueryKeys('admin', {
  // ===== GET Queries =====
  all: () => [ 'all', ], // 모든 관리자 관련 쿼리 무효화

  // ===== POST Mutations =====
  signup: () => [ 'signup', ],

  // ===== PUT Mutations =====
  updateProfile: () => [ 'updateProfile', ], // 관리자 프로필 수정
});
