import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { categorySubscribeKeys } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { MultipleResultType } from '@/_types';

interface UseCreateMultipleCategorySubscribesOptions extends MutationOptionsType<MultipleResultType> {}

/**
 * @description 다수 카테고리 일괄 구독을 위한 커스텀 훅
 * @param {UseCreateMultipleCategorySubscribesOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 카테고리 일괄 구독 뮤테이션 객체
 */
export function useCreateMultipleCategorySubscribes(options: UseCreateMultipleCategorySubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePost<MultipleResultType, any>({
    url: [
      'users', 'subscribes', 'categories', 'multiple',
    ],
    key: categorySubscribeKeys.createMultipleCategorySubscribe(),
    callback() {
      toast.success('다수 카테고리 구독이 설정되었습니다.', {
        style: getToastStyle('success'),
      });

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: categorySubscribeKeys.categorySubscribeList({}).queryKey,
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
