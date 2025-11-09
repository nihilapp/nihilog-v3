import type { UpdateUserType } from '@nihilog/schemas';
import type { SelectUserInfoType } from '@nihilog/schemas';
import { useRouter } from 'next/navigation';

import { usePut } from '@/_entities/common/hooks';
import { useInvalidateUsersCache } from '@/_entities/users/users.keys';

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
    callback(_res) {
      // 사용자 관련 캐시 무효화
      invalidateCache();

      // 프로필 수정 후 프로필 페이지로 이동
      router.push('/profile');
    },
    errorCallback(_error) {},
  });

  return mutation;
}
