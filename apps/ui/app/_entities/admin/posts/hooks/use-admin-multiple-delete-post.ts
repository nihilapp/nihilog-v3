import { useDeletes } from '@/_entities/common/hooks';
import type { DeletePostType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

/**
 * @description 다수 포스트를 일괄 삭제하는 커스텀 훅
 */
export function useAdminMultipleDeletePost() {
  const invalidateCache = useInvalidateAdminPostsCache();

  const mutation = useDeletes<MultipleResultType, DeletePostType>({
    url: [
      'admin',
      'posts',
      'multiple',
    ],
    callback(_res) {
      // Admin Posts 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
