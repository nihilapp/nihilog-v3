import type { DeleteTagSubscribeType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useDeletes } from '@/_hooks/common';
import { useInvalidateTagSubscribeCache } from '@/_keys/subscribe/tag-subscribe/tag-subscribe.keys';

/**
 * @description 다수 태그 구독을 일괄 해제하는 커스텀 훅
 */
export function useMultipleDeleteTagSubscribe() {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = useDeletes<MultipleResultType, DeleteTagSubscribeType>({
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
