import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteSubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminSubscribeCache } from '../admin-subscribe.keys';

interface OptionType extends MutationOptionsType<MultipleResultType, DeleteSubscribeType> {}

/**
 * @description 다수 사용자 구독 설정을 일괄 삭제하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminMultipleDeleteUserSubscribe(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = useDelete<MultipleResultType, DeleteSubscribeType>({
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
