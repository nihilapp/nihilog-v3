import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { categorySubscribeKeys } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SearchCategorySubscribeType } from '@/_schemas/category-subscribe.schema';
import type { MultipleResultType } from '@/_types';

interface UseDeleteMultipleCategorySubscribesOptions extends MutationOptionsType<MultipleResultType> {}

/**
 * @description 다수 카테고리 구독 일괄 해제를 위한 커스텀 훅
 * @param {UseDeleteMultipleCategorySubscribesOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 카테고리 구독 일괄 해제 뮤테이션 객체
 */
export function useDeleteMultipleCategorySubscribes(options: UseDeleteMultipleCategorySubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = useDelete<MultipleResultType, any>({
    url: [
      'users', 'subscribes', 'categories', 'multiple',
    ],
    key: categorySubscribeKeys.deleteMultiple(),
    callback() {
      toast.success('다수 카테고리 구독이 해제되었습니다.', {
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
