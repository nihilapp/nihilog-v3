import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { ResponseType } from '@/_types';

/**
 * @description 사용자 로그아웃을 처리하는 커스텀 훅
 */
export function useSignOut() {
  const removeCache = useInvalidateAuthCache(true);
  const router = useRouter();

  const mutation = usePost<ResponseType<null>, void>({
    url: [
      'auth',
      'signout',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 인증 관련 캐시 무효화
      removeCache();

      // 로그아웃 후 홈으로 이동
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
