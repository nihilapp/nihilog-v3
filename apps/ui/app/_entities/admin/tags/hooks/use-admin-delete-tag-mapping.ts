import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeletePstTagMpngType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

interface OptionType extends MutationOptionsType<boolean, DeletePstTagMpngType> {}

/**
 * @description 태그 매핑을 삭제하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminDeleteTagMapping(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = useDelete<boolean, DeletePstTagMpngType>({
    url: [
      'admin',
      'tags',
      'mapping',
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
