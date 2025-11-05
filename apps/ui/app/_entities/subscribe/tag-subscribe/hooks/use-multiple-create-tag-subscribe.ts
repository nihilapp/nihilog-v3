import { usePost } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import type { CreateTagSubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

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
