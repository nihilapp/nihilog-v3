import { createQueryKeys } from '@lukemorales/query-key-factory';

export const adminKeys = createQueryKeys('admin', {
  // ===== PUT Mutations =====
  updateProfile: () => [
    'admin', 'update', 'profile',
  ], // 관리자 프로필 수정
});
