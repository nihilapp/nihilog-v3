import { useDeletes } from '@/_entities/common/hooks';
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
    callback(_res) {
      // Admin Tags 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
