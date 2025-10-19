import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

interface UseAdminCreateAdminOptions extends MutationOptionsType<SelectUserInfoType, CreateUserType> {}

/**
 * @description 최초 어드민을 생성하는 커스텀 훅 (개발 환경에서만)
 * @param {UseAdminCreateAdminOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminCreateAdmin(options: UseAdminCreateAdminOptions = {}) {
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = usePost<SelectUserInfoType, CreateUserType>({
    url: [
      'admin',
      'users',
      'admin',
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
