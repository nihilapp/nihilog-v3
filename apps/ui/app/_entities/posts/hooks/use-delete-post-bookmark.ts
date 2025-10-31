import { toast } from 'sonner';

import { useDeletes } from '@/_entities/common/hooks';
import { useInvalidatePostsBookmarkCache } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { DeletePostBookmarkType } from '@/_schemas';

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
