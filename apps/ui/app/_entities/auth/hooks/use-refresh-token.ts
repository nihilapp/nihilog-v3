import { toast } from 'sonner';

import { useInvalidateAuthCache } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectUserInfoType } from '@/_types';

interface OptionType extends MutationOptionsType<SelectUserInfoType, void> {}

/**
 * @description 액세스 토큰을 갱신하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useRefreshToken(options: OptionType = {}) {
  const invalidateCache = useInvalidateAuthCache();

  const mutation = usePost<SelectUserInfoType, void>({
    url: [
      'auth',
      'refresh',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
      // 인증 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback() {
      toast.error(
        '토큰 갱신에 실패했습니다.',
        {
          style: getToastStyle('error'),
        }
      );
    },
    ...options,
  });

  return mutation;
}
