import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

interface UseDeleteUserOptions extends MutationOptionsType<boolean, void> {
  userNo: number;
}

/**
 * @description 사용자를 삭제하는 커스텀 훅
 * @param {UseDeleteUserOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useDeleteUser(options: UseDeleteUserOptions = { userNo: 0, }) {
  const { userNo, ...mutationOptions } = options;
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = useDelete<boolean, void>({
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
