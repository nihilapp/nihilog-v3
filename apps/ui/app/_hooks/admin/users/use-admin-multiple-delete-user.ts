import type { DeleteMultipleUsersType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useDeletes } from '@/_hooks/common';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

/**
 * @description 다수 사용자를 일괄 삭제하는 커스텀 훅
 */
export function useAdminMultipleDeleteUser() {
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = useDeletes<MultipleResultType, DeleteMultipleUsersType>({
    url: [
      'admin',
      'users',
      'multiple',
    ],
    callback(_res) {
      // Admin Users 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
