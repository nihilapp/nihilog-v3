import { useDelete } from '@/_hooks/common';

import { useInvalidateAdminUsersCache } from '@/_keys/admin/users/admin-users.keys';

/**
 * @description 사용자를 삭제하는 커스텀 훅
 * @param {number} userNo - 사용자 번호
 */
export function useAdminDeleteUser(userNo: number) {
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = useDelete<boolean>({
    url: [
      'admin',
      'users',
      userNo.toString(),
    ],
    callback(_res) {
      // Admin Users 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
