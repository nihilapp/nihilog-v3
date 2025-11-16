import type { ResponseType } from '@nihilog/schemas';
import { useRouter } from 'next/navigation';

import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import { usePost } from '@/_entities/common/hooks';
import { useAuthActions } from '@/_stores/auth.store';

/**
 * @description 사용자 로그아웃을 처리하는 커스텀 훅
 */
export function useSignOut() {
  const removeCache = useInvalidateAuthCache(true);
  const router = useRouter();
  const { clearSession, } = useAuthActions();

  const mutation = usePost<ResponseType<null>, void>({
    url: [
      'auth',
      'signout',
    ],
    callback(_res) {
      // 세션 정보를 store에서 제거
      clearSession();

      // 인증 관련 캐시 무효화
      removeCache();

      // 로그아웃 후 홈으로 이동
      router.push('/');
    },
    errorCallback(_error) {},
  });

  return mutation;
}
