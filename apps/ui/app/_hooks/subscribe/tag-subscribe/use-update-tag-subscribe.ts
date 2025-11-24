import type { UpdateTagSubscribeType } from '@nihilog/schemas';
import type { SelectTagSbcrMpngType } from '@nihilog/schemas';

import { usePut } from '@/_hooks/common';
import { useInvalidateTagSubscribeCache } from '@/_keys/subscribe/tag-subscribe/tag-subscribe.keys';

/**
 * @description 태그 구독 설정을 변경하는 커스텀 훅
 * @param {number} tagSbcrNo - 태그 구독 번호
 */
export function useUpdateTagSubscribe(tagSbcrNo: number) {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = usePut<SelectTagSbcrMpngType, UpdateTagSubscribeType>({
    url: [
      'users',
      'subscribes',
      'tags',
      tagSbcrNo.toString(),
    ],
    callback(_res) {
      // 태그 구독 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
