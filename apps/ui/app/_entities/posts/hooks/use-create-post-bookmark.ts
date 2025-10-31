import { toast } from 'sonner';

import { usePost } from '@/_entities/common/hooks';
import { useInvalidatePostsBookmarkCache } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { CreatePostBookmarkType } from '@/_schemas';
import type { SelectPostBookmarkType } from '@/_types';

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
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 북마크 관련 캐시 무효화
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
