import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { useDelete } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { DeleteCategorySubscribeType } from '@/_schemas';
import type { ResponseType } from '@/_types';

interface OptionType extends MutationOptionsType<ResponseType<boolean>, DeleteCategorySubscribeType> {}

/**
 * @description 카테고리 구독을 해제하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useDeleteCategorySubscribe(options: OptionType = {}) {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = useDelete<ResponseType<boolean>, DeleteCategorySubscribeType>({
    url: (variables) => [
      'users',
      'subscribes',
      'categories',
      variables.ctgrySbcrNo?.toString() || '0',
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
