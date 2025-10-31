import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useDelete } from '@/_entities/common/hooks';
import { useInvalidateUsersCache } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';

/**
 * @description 내 프로필을 삭제하는 커스텀 훅
 */
export function useDeleteUserProfile() {
  const invalidateCache = useInvalidateUsersCache();
  const router = useRouter();

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

      // 프로필 삭제 후 홈으로 이동
      router.push('/');
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
