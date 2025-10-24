import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { useDelete } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { DeleteTagSubscribeType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

interface OptionType extends MutationOptionsType<MultipleResultType, DeleteTagSubscribeType> {}

/**
 * @description 다수 태그 구독을 일괄 해제하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useMultipleDeleteTagSubscribe(options: OptionType = {}) {
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = useDelete<MultipleResultType, DeleteTagSubscribeType>({
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
