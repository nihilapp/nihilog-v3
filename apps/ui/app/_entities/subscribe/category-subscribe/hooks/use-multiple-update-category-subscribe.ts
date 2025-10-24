import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePut } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateCategorySubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

interface OptionType extends MutationOptionsType<MultipleResultType, UpdateCategorySubscribeType> {}

/**
 * @description 다수 카테고리 구독 설정을 일괄 변경하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useMultipleUpdateCategorySubscribe(options: OptionType = {}) {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePut<MultipleResultType, UpdateCategorySubscribeType>({
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
