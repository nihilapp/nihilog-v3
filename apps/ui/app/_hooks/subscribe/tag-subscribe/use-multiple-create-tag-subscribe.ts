import type { CreateTagSubscribeType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { usePost } from '@/_hooks/common';
import { useInvalidateTagSubscribeCache } from '@/_keys/subscribe/tag-subscribe/tag-subscribe.keys';

/**
 * @description 다수 태그를 일괄 구독하는 커스텀 훅
 */
export function useMultipleCreateTagSubscribe() {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = usePost<MultipleResultType, CreateTagSubscribeType>({
    url: [
      'users',
      'subscribes',
      'tags',
      'multiple',
    ],
    callback(_res) {
      // 태그 구독 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
