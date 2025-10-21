import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteSubscribeType } from '@/_schemas';

import { useInvalidateAdminSubscribeCache } from '../admin-subscribe.keys';

interface OptionType extends MutationOptionsType<boolean, DeleteSubscribeType> {}

/**
 * @description 특정 사용자 구독 설정을 삭제하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminDeleteUserSubscribe(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = useDelete<boolean, DeleteSubscribeType>({
    url: (variables) => [
      'admin',
      'subscribes',
      variables.sbcrNo?.toString() || '0',
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
