import { toast } from 'sonner';

import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { ResponseType } from '@/_types';

interface OptionType extends MutationOptionsType<ResponseType<null>, void> {}

/**
 * @description 사용자 로그아웃을 처리하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useSignOut(options: OptionType = {}) {
  const removeCache = useInvalidateAuthCache(true);

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
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
    ...options,
  });

  return mutation;
}
