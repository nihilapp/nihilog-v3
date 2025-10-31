import { toast } from 'sonner';

import { useDeletes } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { DeleteTagSubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

/**
 * @description 다수 태그 구독을 일괄 해제하는 커스텀 훅
 */
export function useMultipleDeleteTagSubscribe() {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = useDeletes<MultipleResultType, DeleteTagSubscribeType>({
    url: [
      'users',
      'subscribes',
      'tags',
      'multiple',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 태그 구독 관련 캐시 무효화
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
