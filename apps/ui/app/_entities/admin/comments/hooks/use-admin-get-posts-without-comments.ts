import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { PostsWithoutCommentsItemType } from '@/_types';

/**
 * @description 댓글 없는 포스트 목록을 조회하는 커스텀 훅
 */
export function useAdminGetPostsWithoutComments() {
  const query = useGet<PostsWithoutCommentsItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'posts-without-comments',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
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

  return query;
}
