import { toast } from 'sonner';

import { useInvalidateAdminSubscribeCache } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import { useDeletes } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteTagSubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

/**
 * @description 관리자가 다수 태그 구독을 일괄 삭제하는 커스텀 훅
 */
export function useAdminMultipleDeleteTagSubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = useDeletes<MultipleResultType, DeleteTagSubscribeType>({
    url: [
      'admin',
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
