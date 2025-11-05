import { useDeletes } from '@/_entities/common/hooks';
import type { DeletePstTagMpngType } from '@/_schemas';

import { useInvalidateAdminTagsCache } from '../admin-tags.keys';

/**
 * @description 태그 매핑을 삭제하는 커스텀 훅
 */
export function useAdminDeleteTagMapping() {
  const invalidateCache = useInvalidateAdminTagsCache();

  const mutation = useDeletes<boolean, DeletePstTagMpngType>({
    url: [
      'admin',
      'tags',
      'mapping',
    ],
    callback(_res) {
      // Admin Tags 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
