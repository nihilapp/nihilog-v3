import { toast } from 'sonner';

import { usePost } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { CreateTagSubscribeType } from '@/_schemas';
import type { SelectTagSbcrMpngType } from '@/_types';

/**
 * @description 특정 태그를 구독하는 커스텀 훅
 * @param {number} tagNo - 태그 번호
 */
export function useCreateTagSubscribe(tagNo: number) {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = usePost<SelectTagSbcrMpngType, CreateTagSubscribeType>({
    url: [
      'users',
      'subscribes',
      'tags',
      tagNo.toString(),
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
