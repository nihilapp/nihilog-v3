import { toast } from 'sonner';

import { usePost } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { CreateCategorySubscribeType } from '@/_schemas';
import type { SelectCtgrySbcrMpngType } from '@/_types';

/**
 * @description 특정 카테고리를 구독하는 커스텀 훅
 * @param {number} ctgryNo - 카테고리 번호
 */
export function useCreateCategorySubscribe(ctgryNo: number) {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePost<SelectCtgrySbcrMpngType, CreateCategorySubscribeType>({
    url: [
      'users',
      'subscribes',
      'categories',
      ctgryNo.toString(),
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
