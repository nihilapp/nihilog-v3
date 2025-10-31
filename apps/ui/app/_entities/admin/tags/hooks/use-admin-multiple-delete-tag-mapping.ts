import { toast } from 'sonner';

import { useDeletes } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeletePstTagMpngType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

/**
 * @description 다수 태그 매핑을 삭제하는 커스텀 훅
 */
export function useAdminMultipleDeleteTagMapping() {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = useDeletes<MultipleResultType, DeletePstTagMpngType>({
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
  });

  return mutation;
}
