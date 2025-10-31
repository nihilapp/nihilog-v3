import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { usePost } from '@/_entities/common/hooks';
import { useInvalidateUsersCache } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { CreateUserType } from '@/_schemas';
import type { SelectUserInfoType } from '@/_types';

/**
 * @description 새 사용자 계정을 생성하는 커스텀 훅
 */
export function useCreateUser() {
  const invalidateCache = useInvalidateUsersCache();
  const router = useRouter();

  const mutation = usePost<SelectUserInfoType, CreateUserType>({
    url: [ 'users', ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 사용자 관련 캐시 무효화
      invalidateCache();

      // 회원가입 성공 후 로그인 페이지로 이동
      router.push('/auth/signin');
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
