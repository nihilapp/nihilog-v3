import type { UpdatePostType } from '@nihilog/schemas';
import type { SelectPostType } from '@nihilog/schemas';

import { usePatch } from '@/_hooks/common';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

/**
 * @description 포스트를 수정하는 커스텀 훅
 * @param {number} pstNo - 포스트 번호
 */
export function useAdminUpdatePost(pstNo: number) {
  const invalidateCache = useInvalidateAdminPostsCache();

  const mutation = usePatch<SelectPostType, UpdatePostType>({
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
