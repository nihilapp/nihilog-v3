import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePost } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { CreateCategorySubscribeType } from '@/_schemas';
import type { SelectCategorySubscribeMappingType } from '@/_types';

interface OptionType extends MutationOptionsType<SelectCategorySubscribeMappingType, CreateCategorySubscribeType> {
  ctgryNo: number;
}

/**
 * @description 특정 카테고리를 구독하는 커스텀 훅
 * @param {OptionType} options - 뮤테이션 옵션
 */
export function useCreateCategorySubscribe(options: OptionType) {
  const { ctgryNo, ...restOptions } = options;
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePost<SelectCategorySubscribeMappingType, CreateCategorySubscribeType>({
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
    ...restOptions,
  });

  return mutation;
}
