import { toast } from 'sonner';

import { useInvalidateAdminSubscribeCache } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateCategorySubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

/**
 * @description 관리자가 다수 카테고리 구독을 일괄 생성하는 커스텀 훅
 */
export function useAdminMultipleCreateCategorySubscribe() {
  const invalidateCache = useInvalidateAdminSubscribeCache();

  const mutation = usePost<MultipleResultType, CreateCategorySubscribeType>({
    url: [
      'admin',
      'subscribes',
      'categories',
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
