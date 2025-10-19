import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

interface UseAdminCreateUserOptions extends MutationOptionsType<SelectUserInfoType, CreateUserType> {}

/**
 * @description 새 사용자를 생성하는 커스텀 훅
 * @param {UseAdminCreateUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminCreateUser(options: UseAdminCreateUserOptions = {}) {
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = usePost<SelectUserInfoType, CreateUserType>({
    url: [
      'admin',
      'users',
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
