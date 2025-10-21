import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { useInvalidateCategorySubscribeCache } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateCategorySubscribeType } from '@/_schemas';
import type { SelectCategorySubscribeMappingType } from '@/_types';

type UpdateCategorySubscribeWithIdType = UpdateCategorySubscribeType & { ctgrySbcrNo?: number };

interface UseUpdateCategorySubscribeOptions extends MutationOptionsType<SelectCategorySubscribeMappingType, UpdateCategorySubscribeWithIdType> {}

/**
 * @description 카테고리 구독 설정을 변경하는 커스텀 훅
 * @param {UseUpdateCategorySubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useUpdateCategorySubscribe(options: UseUpdateCategorySubscribeOptions = {}) {
  const invalidateCache = useInvalidateCategorySubscribeCache();

  const mutation = usePut<SelectCategorySubscribeMappingType, UpdateCategorySubscribeWithIdType>({
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
