import { toast } from 'sonner';

import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateSubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminSubscribeCache } from '../admin-subscribe.keys';

/**
 * @description 다수 사용자 구독 설정을 일괄 변경하는 커스텀 훅
 */
export function useAdminMultipleUpdateUserSubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = usePut<MultipleResultType, UpdateSubscribeType>({
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
  });

  return mutation;
}
