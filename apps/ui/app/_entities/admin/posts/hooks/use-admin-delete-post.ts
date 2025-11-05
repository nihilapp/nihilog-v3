import { useDelete } from '@/_entities/common/hooks';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

/**
 * @description 포스트를 삭제하는 커스텀 훅
 * @param {number} pstNo - 포스트 번호
 */
export function useAdminDeletePost(pstNo: number) {
  const invalidateCache = useInvalidateAdminPostsCache();

  const mutation = useDelete<boolean>({
    url: [
      'admin',
      'posts',
      pstNo.toString(),
    ],
    callback(_res) {
      // Admin Posts 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
