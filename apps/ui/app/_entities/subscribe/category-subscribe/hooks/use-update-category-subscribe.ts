import { toast } from 'sonner';

import { usePut } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateCategorySubscribeType } from '@/_schemas';
import type { SelectCtgrySbcrMpngType } from '@/_types';

/**
 * @description 카테고리 구독 설정을 변경하는 커스텀 훅
 * @param {number} ctgrySbcrNo - 카테고리 구독 번호
 */
export function useUpdateCategorySubscribe(ctgrySbcrNo: number) {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePut<SelectCtgrySbcrMpngType, UpdateCategorySubscribeType>({
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
