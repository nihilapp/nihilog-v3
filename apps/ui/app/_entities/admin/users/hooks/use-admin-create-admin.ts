import type { CreateUserType } from '@nihilog/schemas';
import type { SelectUserInfoType } from '@nihilog/schemas';
import { useRouter } from 'next/navigation';

import { usePost } from '@/_entities/common/hooks';

import { useInvalidateAdminUsersCache } from '../admin-users.keys';

/**
 * @description 최초 어드민을 생성하는 커스텀 훅 (개발 환경에서만)
 */
export function useAdminCreateAdmin() {
  const invalidateCache = useInvalidateAdminUsersCache();
  const router = useRouter();

  const mutation = usePost<SelectUserInfoType, CreateUserType>({
    url: [
      'admin',
      'users',
      'admin',
    ],
    callback(_res) {
      // Admin Users 관련 캐시 무효화
      invalidateCache();

      router.push('/auth/signin');
    },
    errorCallback(_error) {},
  });

  return mutation;
}
