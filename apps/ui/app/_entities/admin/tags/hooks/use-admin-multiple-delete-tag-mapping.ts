import { useDeletes } from '@/_entities/common/hooks';
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
    callback(_res) {
      // Admin Tags 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
