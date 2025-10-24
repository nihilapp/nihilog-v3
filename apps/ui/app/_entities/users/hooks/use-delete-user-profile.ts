import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { useDelete } from '@/_entities/common/hooks';
import { useInvalidateUsersCache } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';

interface OptionType extends MutationOptionsType<boolean> {}

/**
 * @description 내 프로필을 삭제하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useDeleteUserProfile(options: OptionType = {}) {
  const invalidateCache = useInvalidateUsersCache();

  const mutation = useDelete<boolean>({
    url: [
      'users',
      'profile',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 사용자 관련 캐시 무효화
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
