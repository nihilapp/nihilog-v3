import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { ResponseType } from '@/_types';

interface UseDeleteCategorySubscribeOptions extends MutationOptionsType<ResponseType<boolean>, void> {
  ctgrySbcrNo: number;
}

/**
 * @description 카테고리 구독을 해제하는 커스텀 훅
 * @param {UseDeleteCategorySubscribeOptions} options - 뮤테이션 옵션
 */
export function useDeleteCategorySubscribe(options: UseDeleteCategorySubscribeOptions) {
  const { ctgrySbcrNo, ...restOptions } = options;
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = useDelete<ResponseType<boolean>, void>({
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
    ...restOptions,
  });

  return mutation;
}
