import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateTagSubscribeType } from '@/_schemas';
import type { SelectTagSubscribeMappingType } from '@/_types';

interface UseUpdateTagSubscribeOptions extends MutationOptionsType<SelectTagSubscribeMappingType, UpdateTagSubscribeType> {
  tagSbcrNo: number;
}

/**
 * @description 태그 구독 설정을 변경하는 커스텀 훅
 * @param {UseUpdateTagSubscribeOptions} options - 뮤테이션 옵션
 */
export function useUpdateTagSubscribe(options: UseUpdateTagSubscribeOptions) {
  const { tagSbcrNo, ...restOptions } = options;
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = usePut<SelectTagSubscribeMappingType, UpdateTagSubscribeType>({
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
    ...restOptions,
  });

  return mutation;
}
