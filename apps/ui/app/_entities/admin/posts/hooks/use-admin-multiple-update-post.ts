import type { UpdatePostType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { usePut } from '@/_entities/common/hooks';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

/**
 * @description 다수 포스트를 일괄 수정하는 커스텀 훅
 */
export function useAdminMultipleUpdatePost() {
  const invalidateCache = useInvalidateAdminPostsCache();

  const mutation = usePut<MultipleResultType, UpdatePostType>({
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
