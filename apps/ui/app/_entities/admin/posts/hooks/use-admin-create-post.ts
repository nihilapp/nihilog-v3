import { useRouter } from 'next/navigation';

import { usePost } from '@/_entities/common/hooks';
import type { CreatePostType } from '@/_schemas';
import type { SelectPostType } from '@/_types';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

/**
 * @description 새 포스트를 생성하는 커스텀 훅
 */
export function useAdminCreatePost() {
  const invalidateCache = useInvalidateAdminPostsCache();
  const router = useRouter();

  const mutation = usePost<SelectPostType, CreatePostType>({
    url: [
      'admin',
      'posts',
    ],
    callback(res) {
      if (!res.data) {
        return;
      }

      // Admin Posts 관련 캐시 무효화
      invalidateCache();

      router.push(`/admin/posts/edit?pstNo=${res.data.pstNo}`);
    },
    errorCallback(_error) {},
  });

  return mutation;
}
