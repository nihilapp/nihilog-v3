import type { PostsWithoutCommentsItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

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
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
