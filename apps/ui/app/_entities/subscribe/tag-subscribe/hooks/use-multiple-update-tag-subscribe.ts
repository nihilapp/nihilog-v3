import type { UpdateTagSubscribeType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { usePut } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';

/**
 * @description 다수 태그 구독 설정을 일괄 변경하는 커스텀 훅
 */
export function useMultipleUpdateTagSubscribe() {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = usePut<MultipleResultType, UpdateTagSubscribeType>({
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
