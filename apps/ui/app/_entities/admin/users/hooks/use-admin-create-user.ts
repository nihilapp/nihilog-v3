import { usePost } from '@/_entities/common/hooks';
import type { CreateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

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
