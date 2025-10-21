import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

type UpdateUserWithIdType = UpdateUserType & { userNo?: number };

interface UseAdminUpdateUserOptions extends MutationOptionsType<SelectUserInfoType, UpdateUserWithIdType> {}

/**
 * @description 사용자를 수정하는 커스텀 훅
 * @param {UseAdminUpdateUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminUpdateUser(options: UseAdminUpdateUserOptions = {}) {
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = usePut<SelectUserInfoType, UpdateUserWithIdType>({
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
