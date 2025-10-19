import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteTagType } from '@/_schemas';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

interface UseDeleteTagOptions extends MutationOptionsType<boolean, DeleteTagType> {}

/**
 * @description 태그를 삭제하는 커스텀 훅
 * @param {UseDeleteTagOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminDeleteTag(options: UseDeleteTagOptions = {}) {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = useDelete<boolean, DeleteTagType>({
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
