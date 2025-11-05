import { usePut } from '@/_entities/common/hooks';
import type { UpdateUserType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

/**
 * @description 다수 사용자를 일괄 수정하는 커스텀 훅
 */
export function useAdminMultipleUpdateUser() {
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = usePut<MultipleResultType, UpdateUserType>({
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
