import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

interface UseAdminUpdateUserOptions extends MutationOptionsType<SelectUserInfoType, UpdateUserType> {
  userNo: number;
}

/**
 * @description 사용자를 수정하는 커스텀 훅
 * @param {UseAdminUpdateUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminUpdateUser(options: UseAdminUpdateUserOptions = { userNo: 0, }) {
  const { userNo, ...mutationOptions } = options;
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = usePut<SelectUserInfoType, UpdateUserType>({
    url: [
      'admin',
      'users',
      userNo.toString(),
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
    ...mutationOptions,
  });

  return mutation;
}
