import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateTagType } from '@/_types';
import type { SelectTagInfoType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

interface OptionType extends MutationOptionsType<SelectTagInfoType, CreateTagType> {}

/**
 * @description 새 태그를 생성하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminCreateTag(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = usePost<SelectTagInfoType, CreateTagType>({
    url: [
      'admin',
      'tags',
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
