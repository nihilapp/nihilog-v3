import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeletePstTagMpngType } from '@/_types';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

interface OptionType extends MutationOptionsType<MultipleResultType, DeletePstTagMpngType> {}

/**
 * @description 다수 태그 매핑을 삭제하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminMultipleDeleteTagMapping(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = useDelete<MultipleResultType, DeletePstTagMpngType>({
    url: [
      'admin',
      'tags',
      'mapping',
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
