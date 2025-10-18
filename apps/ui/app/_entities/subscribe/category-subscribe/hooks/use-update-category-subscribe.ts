import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateCategorySubscribeType } from '@/_schemas';
import type { SelectCategorySubscribeMappingType } from '@/_types';

interface UseUpdateCategorySubscribeOptions extends MutationOptionsType<SelectCategorySubscribeMappingType, UpdateCategorySubscribeType> {
  ctgrySbcrNo: number;
}

/**
 * @description 카테고리 구독 설정을 변경하는 커스텀 훅
 * @param {UseUpdateCategorySubscribeOptions} options - 뮤테이션 옵션
 */
export function useUpdateCategorySubscribe(options: UseUpdateCategorySubscribeOptions) {
  const { ctgrySbcrNo, ...restOptions } = options;
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePut<SelectCategorySubscribeMappingType, UpdateCategorySubscribeType>({
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
