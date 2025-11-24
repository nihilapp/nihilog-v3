import type { UpdateUserType } from '@nihilog/schemas';
import type { SelectUserInfoType } from '@nihilog/schemas';
import { useRouter } from 'next/navigation';

import { useInvalidateAdminCache } from '@/_keys/admin/admin.keys';
import { usePut } from '@/_hooks/common';

/**
 * @description 관리자 프로필을 수정하는 커스텀 훅
 */
export function useAdminUpdateProfile() {
  const invalidateCache = useInvalidateAdminCache();
  const router = useRouter();

  const mutation = usePut<SelectUserInfoType, UpdateUserType>({
    url: [
      'admin',
      'profile',
    ],
    callback(_res) {
      //

      // 관리자 관련 캐시 무효화
      invalidateCache();

      // 프로필 수정 후 관리자 대시보드로 이동
      router.push('/admin/dashboard');
    },
    errorCallback(_error) {
      //

    },
  });

  return mutation;
}
