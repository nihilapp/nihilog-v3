import { toast } from 'sonner';

import { usePut } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateTagSubscribeType } from '@/_schemas';
import type { SelectTagSbcrMpngType } from '@/_types';

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
