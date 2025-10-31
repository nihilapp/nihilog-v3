import { toast } from 'sonner';

import { useDeletes } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteTagType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

/**
 * @description 다수 태그를 삭제하는 커스텀 훅
 */
export function useAdminMultipleDeleteTag() {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = useDeletes<MultipleResultType, DeleteTagType>({
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
  });

  return mutation;
}
