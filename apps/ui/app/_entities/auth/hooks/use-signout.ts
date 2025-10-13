import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';

interface UseSignOutOptions extends MutationOptionsType<null, null> {}

/**
 * @description 로그아웃을 위한 커스텀 훅
 * @param {UseSignOutOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 로그아웃 뮤테이션 객체
 */
export function useSignOut(options: UseSignOutOptions = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = usePost<null, null>({
    url: [
      'auth', 'signout',
    ],
    key: authKeys.signout(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 로그아웃 성공 시 세션 갱신
      queryClient.removeQueries({
        queryKey: authKeys.session().queryKey,
      });
      // 홈으로 이동
      router.push('/');
    },
    errorCallback(err) {
      toast.error(err.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
