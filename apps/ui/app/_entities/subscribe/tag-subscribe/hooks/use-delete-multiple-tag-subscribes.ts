import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { MultipleResultType } from '@/_types';

interface UseDeleteMultipleTagSubscribesOptions extends MutationOptionsType<MultipleResultType> {}

/**
 * @description 다수 태그 구독 일괄 해제를 위한 커스텀 훅
 * @param {UseDeleteMultipleTagSubscribesOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 태그 구독 일괄 해제 뮤테이션 객체
 */
export function useDeleteMultipleTagSubscribes(options: UseDeleteMultipleTagSubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = useDelete<MultipleResultType, any>({
    url: [
      'users', 'subscribes', 'tags', 'multiple',
    ],
    key: tagSubscribeKeys.deleteMultipleTagSubscribe(),
    callback() {
      toast.success('다수 태그 구독이 해제되었습니다.', {
        style: getToastStyle('success'),
      });

      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: tagSubscribeKeys.tagSubscribeList({}).queryKey,
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
