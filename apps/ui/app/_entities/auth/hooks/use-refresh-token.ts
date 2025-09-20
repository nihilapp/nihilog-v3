import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UserInfoType } from '@/_schemas/user.schema';

interface UseRefreshTokenOptions extends MutationOptionsType<UserInfoType, null> {}

/**
 * @description 토큰 갱신을 위한 커스텀 훅
 * @param {UseRefreshTokenOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 토큰 갱신 뮤테이션 객체
 */
export function useRefreshToken(options?: UseRefreshTokenOptions) {
  const queryClient = useQueryClient();

  const {
    response: session,
    ...query
  } = usePost<UserInfoType, null>({
    url: [
      'auth', 'refresh',
    ],
    key: authKeys.refresh(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 토큰 갱신 성공 시 세션 갱신
      queryClient.invalidateQueries({
        queryKey: authKeys.session().queryKey,
      });
    },
    errorCallback(err) {
      toast.error(err.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return {
    session,
    ...query,
  };
}
