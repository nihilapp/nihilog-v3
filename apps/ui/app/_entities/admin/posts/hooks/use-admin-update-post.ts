import { toast } from 'sonner';

import { usePatch } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdatePostType } from '@/_schemas';
import type { SelectPostType } from '@/_types';

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
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // Admin Posts 관련 캐시 무효화
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
