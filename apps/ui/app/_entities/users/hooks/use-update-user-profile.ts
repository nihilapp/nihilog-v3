import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { useInvalidateUsersCache } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

interface UseUpdateUserProfileOptions extends MutationOptionsType<SelectUserInfoType, UpdateUserType> {}

/**
 * @description 프로필 정보를 수정하는 커스텀 훅
 * @param {UseUpdateUserProfileOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useUpdateUserProfile(options: UseUpdateUserProfileOptions = {}) {
  const invalidateCache = useInvalidateUsersCache();

  const mutation = usePut<SelectUserInfoType, UpdateUserType>({
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
