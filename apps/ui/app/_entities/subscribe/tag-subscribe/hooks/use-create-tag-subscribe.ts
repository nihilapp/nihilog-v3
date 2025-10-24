import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePost } from '@/_entities/common/hooks';
import { useInvalidateTagSubscribeCache } from '@/_entities/subscribe/tag-subscribe/tag-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { CreateTagSubscribeType } from '@/_schemas';
import type { SelectTagSubscribeMappingType } from '@/_types';

interface OptionType extends MutationOptionsType<SelectTagSubscribeMappingType, CreateTagSubscribeType> {
  tagNo: number;
}

/**
 * @description 특정 태그를 구독하는 커스텀 훅
 * @param {OptionType} options - 뮤테이션 옵션
 */
export function useCreateTagSubscribe(options: OptionType) {
  const { tagNo, ...restOptions } = options;
  const invalidateCache = useInvalidateTagSubscribeCache();

  const mutation = usePost<SelectTagSubscribeMappingType, CreateTagSubscribeType>({
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
    ...restOptions,
  });

  return mutation;
}
