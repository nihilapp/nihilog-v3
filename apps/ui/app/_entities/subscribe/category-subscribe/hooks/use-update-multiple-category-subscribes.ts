import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { categorySubscribeKeys } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SearchCategorySubscribeType } from '@/_schemas/category-subscribe.schema';
import type { MultipleResultType } from '@/_types';

interface UseUpdateMultipleCategorySubscribesOptions extends MutationOptionsType<MultipleResultType> {}

/**
 * @description 다수 카테고리 구독 설정 일괄 변경을 위한 커스텀 훅
 * @param {UseUpdateMultipleCategorySubscribesOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 카테고리 구독 설정 일괄 변경 뮤테이션 객체
 */
export function useUpdateMultipleCategorySubscribes(options: UseUpdateMultipleCategorySubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePut<MultipleResultType, any>({
    url: [
      'users', 'subscribes', 'categories', 'multiple',
    ],
    key: categorySubscribeKeys.updateMultiple(),
    callback() {
      toast.success('다수 카테고리 구독이 수정되었습니다.', {
        style: getToastStyle('success'),
      });

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: categorySubscribeKeys.search({} as SearchCategorySubscribeType).queryKey,
      });
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return mutation;
}
