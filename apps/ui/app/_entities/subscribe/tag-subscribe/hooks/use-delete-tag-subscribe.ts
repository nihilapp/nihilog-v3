import { useDelete } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';

/**
 * @description 태그 구독을 해제하는 커스텀 훅
 * @param {number} tagSbcrNo - 태그 구독 번호
 */
export function useDeleteTagSubscribe(tagSbcrNo: number) {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = useDelete<boolean>({
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
