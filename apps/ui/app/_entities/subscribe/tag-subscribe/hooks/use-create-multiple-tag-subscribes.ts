import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { tagSubscribeKeys } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { MultipleResultType } from '@/_types';

interface UseCreateMultipleTagSubscribesOptions extends MutationOptionsType<MultipleResultType> {}

/**
 * @description 다수 태그 일괄 구독을 위한 커스텀 훅
 * @param {UseCreateMultipleTagSubscribesOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 태그 일괄 구독 뮤테이션 객체
 */
export function useCreateMultipleTagSubscribes(options: UseCreateMultipleTagSubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePost<MultipleResultType, any>({
    url: [
      'users', 'subscribes', 'tags', 'multiple',
    ],
    key: tagSubscribeKeys.createMultipleTagSubscribe(),
    callback() {
      toast.success('다수 태그 구독이 설정되었습니다.', {
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
