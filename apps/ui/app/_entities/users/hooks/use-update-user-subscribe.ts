import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePut } from '@/_entities/common/hooks';
import { useInvalidateUserSubscribeCache } from '@/_entities/users/users.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateSubscribeType } from '@/_schemas';
import type { SelectUserSbcrInfoType } from '@/_types';

interface OptionType extends MutationOptionsType<SelectUserSbcrInfoType, UpdateSubscribeType> {}

/**
 * @description 이메일 구독 설정을 변경하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useUpdateUserSubscribe(options: OptionType = {}) {
  const invalidateCache = useInvalidateUserSubscribeCache();

  const mutation = usePut<SelectUserSbcrInfoType, UpdateSubscribeType>({
    url: [
      'users',
      'subscribe',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 구독 관련 캐시 무효화
      invalidateCache();
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
