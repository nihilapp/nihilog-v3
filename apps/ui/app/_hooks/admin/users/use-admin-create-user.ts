import type { CreateUserType } from '@nihilog/schemas';
import type { SelectUserInfoType } from '@nihilog/schemas';

import { usePost } from '@/_hooks/common';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

/**
 * @description 새 사용자를 생성하는 커스텀 훅
 */
export function useAdminCreateUser() {
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = usePost<SelectUserInfoType, CreateUserType>({
    url: [
      'admin',
      'users',
    ],
    callback(_res) {
      // Admin Users 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
