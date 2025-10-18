import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { DeleteCategorySubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

interface UseMultipleDeleteCategorySubscribeOptions extends MutationOptionsType<MultipleResultType, DeleteCategorySubscribeType> {}

/**
 * @description 다수 카테고리 구독을 일괄 해제하는 커스텀 훅
 * @param {UseMultipleDeleteCategorySubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useMultipleDeleteCategorySubscribe(options: UseMultipleDeleteCategorySubscribeOptions = {}) {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = useDelete<MultipleResultType, DeleteCategorySubscribeType>({
    url: [
      'users',
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
    ...options,
  });

  return mutation;
}
