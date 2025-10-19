import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteUserType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

interface UseMultipleDeleteUserOptions extends MutationOptionsType<MultipleResultType, DeleteUserType> {}

/**
 * @description 다수 사용자를 일괄 삭제하는 커스텀 훅
 * @param {UseMultipleDeleteUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useMultipleDeleteUser(options: UseMultipleDeleteUserOptions = {}) {
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = useDelete<MultipleResultType, DeleteUserType>({
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
    ...options,
  });

  return mutation;
}
