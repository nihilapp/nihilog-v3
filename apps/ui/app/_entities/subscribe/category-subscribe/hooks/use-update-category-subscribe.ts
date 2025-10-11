import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { categorySubscribeKeys } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SelectCategorySubscribeMappingType } from '@/_types';

interface UseUpdateCategorySubscribeOptions extends MutationOptionsType<SelectCategorySubscribeMappingType> {}

/**
 * @description 카테고리 구독 수정을 위한 커스텀 훅
 * @param {number} ctgrySbcrNo - 카테고리 구독 번호
 * @param {UseUpdateCategorySubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 카테고리 구독 수정 뮤테이션 객체
 */
export function useUpdateCategorySubscribe(ctgrySbcrNo: number, options: UseUpdateCategorySubscribeOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePut<SelectCategorySubscribeMappingType, any>({
    url: [
      'users', 'subscribes', 'categories', ctgrySbcrNo,
    ],
    key: categorySubscribeKeys.updateCategorySubscribe(ctgrySbcrNo),
    callback() {
      toast.success('카테고리 구독이 수정되었습니다.', {
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
