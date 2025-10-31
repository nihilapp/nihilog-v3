import { toast } from 'sonner';

import { useDelete } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';

/**
 * @description 카테고리 구독을 해제하는 커스텀 훅
 * @param {number} ctgrySbcrNo - 카테고리 구독 번호
 */
export function useDeleteCategorySubscribe(ctgrySbcrNo: number) {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = useDelete<boolean>({
    url: [
      'users',
      'subscribes',
      'categories',
      ctgrySbcrNo.toString(),
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 카테고리 구독 관련 캐시 무효화
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
