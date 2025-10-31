import { toast } from 'sonner';

import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

/**
 * @description 사용자를 삭제하는 커스텀 훅
 * @param {number} userNo - 사용자 번호
 */
export function useAdminDeleteUser(userNo: number) {
  const invalidateCache = useInvalidateAdminUsersCache();

  const mutation = useDelete<boolean>({
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
  });

  return mutation;
}
