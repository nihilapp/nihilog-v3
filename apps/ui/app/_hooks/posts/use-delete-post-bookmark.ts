import type { DeletePostBookmarkType } from '@nihilog/schemas';

import { useDeletes } from '@/_hooks/common';
import { useInvalidatePostsBookmarkCache } from '@/_keys/posts/posts.keys';

/**
 * @description 포스트 북마크를 삭제하는 커스텀 훅
 */
export function useDeletePostBookmark() {
  const invalidateCache = useInvalidatePostsBookmarkCache();

  const mutation = useDeletes<boolean, DeletePostBookmarkType>({
    url: [
      'posts',
      'bookmarks',
    ],
    callback(_res) {
      // 북마크 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
