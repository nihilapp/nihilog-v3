import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { categorySubscribeKeys } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SearchCategorySubscribeType } from '@/_schemas';
import type { SelectCategorySubscribeMappingType } from '@/_types';

interface UseCreateCategorySubscribeOptions extends MutationOptionsType<SelectCategorySubscribeMappingType> {}

/**
 * @description 카테고리 구독 생성을 위한 커스텀 훅
 * @param {number} ctgryNo - 카테고리 번호
 * @param {UseCreateCategorySubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 카테고리 구독 생성 뮤테이션 객체
 */
export function useCreateCategorySubscribe(ctgryNo: number, options: UseCreateCategorySubscribeOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePost<SelectCategorySubscribeMappingType, any>({
    url: [
      'users', 'subscribes', 'categories', ctgryNo,
    ],
    key: categorySubscribeKeys.create(ctgryNo),
    callback() {
      toast.success('카테고리 구독이 설정되었습니다.', {
        style: getToastStyle('success'),
      });

      // 사용자의 카테고리 구독 목록 무효화 (기본 파라미터 사용)
      queryClient.invalidateQueries({
        queryKey: categorySubscribeKeys.search({} as SearchCategorySubscribeType).queryKey,
      });
      // 특정 카테고리 구독 상태도 무효화
      queryClient.invalidateQueries({
        queryKey: categorySubscribeKeys.byNo(ctgryNo, {} as SearchCategorySubscribeType).queryKey,
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
