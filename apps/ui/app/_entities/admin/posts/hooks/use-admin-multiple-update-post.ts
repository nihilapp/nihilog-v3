import { toast } from 'sonner';

import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdatePostType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

/**
 * @description 다수 포스트를 일괄 수정하는 커스텀 훅
 */
export function useAdminMultipleUpdatePost() {
  const invalidateCache = useInvalidateAdminPostsCache();

  const mutation = usePut<MultipleResultType, UpdatePostType>({
    url: [
      'admin',
      'posts',
      'multiple',
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
