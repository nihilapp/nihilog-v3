import { toast } from 'sonner';

import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
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
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // Admin Users 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  return mutation;
}
