import type { PostsWithoutCommentsItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 댓글 없는 포스트 목록을 조회하는 커스텀 훅
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useAdminGetPostsWithoutComments(enabled: boolean = true) {
  const query = useGet<PostsWithoutCommentsItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'posts-without-comments',
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
