import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { DeleteTagSubscribeType } from '@/_schemas';
import type { ResponseType } from '@/_types';

interface UseDeleteTagSubscribeOptions extends MutationOptionsType<ResponseType<boolean>, DeleteTagSubscribeType> {}

/**
 * @description 태그 구독을 해제하는 커스텀 훅
 * @param {UseDeleteTagSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useDeleteTagSubscribe(options: UseDeleteTagSubscribeOptions = {}) {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = useDelete<ResponseType<boolean>, DeleteTagSubscribeType>({
    url: (variables) => [
      'users',
      'subscribes',
      'tags',
      variables.tagSbcrNo?.toString() || '0',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 태그 구독 관련 캐시 무효화
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
