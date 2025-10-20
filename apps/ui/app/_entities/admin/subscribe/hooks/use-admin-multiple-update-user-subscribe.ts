import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateSubscribeType } from '@/_schemas';

import { useInvalidateAdminSubscribeCache } from '../admin-subscribe.keys';

interface OptionType extends MutationOptionsType<any, UpdateSubscribeType> {}

/**
 * @description 다수 사용자 구독 설정을 일괄 변경하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminMultipleUpdateUserSubscribe(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = usePut<any, UpdateSubscribeType>({
    url: [
      'admin',
      'subscribes',
      'multiple',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // Admin Subscribe 관련 캐시 무효화
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
