import type { CreatePostType } from '@nihilog/schemas';
import type { SelectPostType } from '@nihilog/schemas';
import { useRouter } from 'next/navigation';

import { usePost } from '@/_entities/common/hooks';
import { usePostActions } from '@/_entities/posts/posts.store';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

/**
 * @description 새 포스트를 생성하는 커스텀 훅
 */
export function useAdminCreatePost() {
  const invalidateCache = useInvalidateAdminPostsCache();
  const router = useRouter();
  const postActions = usePostActions();

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

      postActions.setPostNo(res.data.pstNo);
      postActions.setEditMode('create');

      // 주소는 edit 로 바뀔 수도 있음.
      router.push(`/admin/posts/edit?pstNo=${res.data.pstNo}`);
    },
    errorCallback(_error) {},
  });

  return mutation;
}
