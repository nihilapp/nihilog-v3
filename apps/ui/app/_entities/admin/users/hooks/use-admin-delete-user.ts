import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteUserType } from '@/_schemas';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

interface UseAdminDeleteUserOptions extends MutationOptionsType<boolean, DeleteUserType> {}

/**
 * @description 사용자를 삭제하는 커스텀 훅
 * @param {UseAdminDeleteUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminDeleteUser(options: UseAdminDeleteUserOptions = {}) {
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = useDelete<boolean, DeleteUserType>({
    url: (variables) => [
      'admin',
      'users',
      variables.userNo?.toString() || '0',
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
    ...options,
  });

  return mutation;
}
