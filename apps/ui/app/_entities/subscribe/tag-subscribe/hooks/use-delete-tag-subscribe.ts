import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { SearchTagSubscribeType } from '@/_schemas/tag-subscribe.schema';

interface UseDeleteTagSubscribeOptions extends MutationOptionsType<boolean> {
  tagNo?: number; // 태그 번호 (구독 상태 무효화용)
}

/**
 * @description 태그 구독 삭제를 위한 커스텀 훅
 * @param {number} tagSbcrNo - 태그 구독 번호
 * @param {UseDeleteTagSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 태그 구독 삭제 뮤테이션 객체
 */
export function useDeleteTagSubscribe(tagSbcrNo: number, options: UseDeleteTagSubscribeOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = useDelete<boolean, any>({
    url: [
      'users', 'subscribes', 'tags', tagSbcrNo,
    ],
    key: tagSubscribeKeys.delete(tagSbcrNo),
    callback() {
      toast.success('태그 구독이 해제되었습니다.', {
        style: getToastStyle('success'),
      });

      // 사용자의 태그 구독 목록 무효화 (기본 파라미터 사용)
      queryClient.invalidateQueries({
        queryKey: tagSubscribeKeys.search({} as SearchTagSubscribeType).queryKey,
      });
      // 특정 태그 구독 상태도 무효화
      if (options.tagNo) {
        queryClient.invalidateQueries({
          queryKey: tagSubscribeKeys.byNo(options.tagNo, {} as SearchTagSubscribeType).queryKey,
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
