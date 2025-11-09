import type { CreatePostBookmarkType } from '@nihilog/schemas';
import type { SelectPostBookmarkType } from '@nihilog/schemas';

import { usePost } from '@/_entities/common/hooks';
import { useInvalidatePostsBookmarkCache } from '@/_entities/posts/posts.keys';

/**
 * @description 포스트 북마크를 생성하는 커스텀 훅
 */
export function useCreatePostBookmark() {
  const invalidateCache = useInvalidatePostsBookmarkCache();

  const mutation = usePost<SelectPostBookmarkType, CreatePostBookmarkType>({
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
