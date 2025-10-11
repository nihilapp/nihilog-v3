import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { categorySubscribeKeys } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';

interface UseDeleteCategorySubscribeOptions extends MutationOptionsType<boolean> {
  ctgryNo?: number; // 카테고리 번호 (구독 상태 무효화용)
}

/**
 * @description 카테고리 구독 삭제를 위한 커스텀 훅
 * @param {number} ctgrySbcrNo - 카테고리 구독 번호
 * @param {UseDeleteCategorySubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 카테고리 구독 삭제 뮤테이션 객체
 */
export function useDeleteCategorySubscribe(ctgrySbcrNo: number, options: UseDeleteCategorySubscribeOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = useDelete<boolean, any>({
    url: [
      'users', 'subscribes', 'categories', ctgrySbcrNo,
    ],
    key: categorySubscribeKeys.deleteCategorySubscribe(ctgrySbcrNo),
    callback() {
      toast.success('카테고리 구독이 해제되었습니다.', {
        style: getToastStyle('success'),
      });

      // 사용자의 카테고리 구독 목록 무효화 (기본 파라미터 사용)
      queryClient.invalidateQueries({
        queryKey: categorySubscribeKeys.categorySubscribeList({}).queryKey,
      });
      // 특정 카테고리 구독 상태도 무효화
      if (options.ctgryNo) {
        queryClient.invalidateQueries({
          queryKey: categorySubscribeKeys.categorySubscribeByNo(options.ctgryNo, {}).queryKey,
        });
      }
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
