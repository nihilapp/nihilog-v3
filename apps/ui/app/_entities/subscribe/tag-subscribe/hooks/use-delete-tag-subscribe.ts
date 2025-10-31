import { toast } from 'sonner';

import { useDelete } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';

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
  });

  return mutation;
}
