import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateTagType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

interface OptionType extends MutationOptionsType<MultipleResultType, UpdateTagType> {}

/**
 * @description 다수 태그를 수정하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminMultipleUpdateTag(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = usePut<MultipleResultType, UpdateTagType>({
    url: [
      'admin',
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

      // Admin Tags 관련 캐시 무효화
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
