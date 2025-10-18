import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { CreateTagSubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

interface UseMultipleCreateTagSubscribeOptions extends MutationOptionsType<MultipleResultType, CreateTagSubscribeType> {}

/**
 * @description 다수 태그를 일괄 구독하는 커스텀 훅
 * @param {UseMultipleCreateTagSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useMultipleCreateTagSubscribe(options: UseMultipleCreateTagSubscribeOptions = {}) {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = usePost<MultipleResultType, CreateTagSubscribeType>({
    url: [
      'users',
      'subscribes',
      'tags',
      'multiple',
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
