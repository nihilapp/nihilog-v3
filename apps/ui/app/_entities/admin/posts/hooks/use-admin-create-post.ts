import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
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

      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // Admin Posts 관련 캐시 무효화
      invalidateCache();

      router.push(`/admin/posts/edit?pstNo=${res.data.pstNo}`);
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
