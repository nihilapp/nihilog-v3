import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateTagSubscribeType } from '@/_schemas';
import type { SelectTagSubscribeMappingType } from '@/_types';

type UpdateTagSubscribeWithIdType = UpdateTagSubscribeType & { tagSbcrNo?: number };

interface UseUpdateTagSubscribeOptions extends MutationOptionsType<SelectTagSubscribeMappingType, UpdateTagSubscribeWithIdType> {}

/**
 * @description 태그 구독 설정을 변경하는 커스텀 훅
 * @param {UseUpdateTagSubscribeOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useUpdateTagSubscribe(options: UseUpdateTagSubscribeOptions = {}) {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = usePut<SelectTagSubscribeMappingType, UpdateTagSubscribeWithIdType>({
    url: (variables) => [
      'users',
      'subscribes',
      'tags',
      variables.tagSbcrNo?.toString() || '0',
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
    ...options,
  });

  return mutation;
}
