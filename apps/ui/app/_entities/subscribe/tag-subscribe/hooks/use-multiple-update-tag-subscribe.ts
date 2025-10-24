import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePut } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateTagSubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

interface OptionType extends MutationOptionsType<MultipleResultType, UpdateTagSubscribeType> {}

/**
 * @description 다수 태그 구독 설정을 일괄 변경하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useMultipleUpdateTagSubscribe(options: OptionType = {}) {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = usePut<MultipleResultType, UpdateTagSubscribeType>({
    url: [
      'users',
      'subscribes',
      'tags',
      'multiple',
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
