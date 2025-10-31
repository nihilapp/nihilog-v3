import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { usePut } from '@/_entities/common/hooks';
import { useInvalidateUsersCache } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

/**
 * @description 프로필 정보를 수정하는 커스텀 훅
 */
export function useUpdateUserProfile() {
  const invalidateCache = useInvalidateUsersCache();
  const router = useRouter();

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

      // 프로필 수정 후 프로필 페이지로 이동
      router.push('/profile');
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
