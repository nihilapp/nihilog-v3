import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { CreateCategorySubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

interface UseMultipleCreateCategorySubscribeOptions extends MutationOptionsType<MultipleResultType, CreateCategorySubscribeType> {}

/**
 * @description 다수 카테고리를 일괄 구독하는 커스텀 훅
 * @param {UseMultipleCreateCategorySubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useMultipleCreateCategorySubscribe(options: UseMultipleCreateCategorySubscribeOptions = {}) {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePost<MultipleResultType, CreateCategorySubscribeType>({
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
