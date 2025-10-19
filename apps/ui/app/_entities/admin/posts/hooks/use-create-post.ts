import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreatePostType } from '@/_schemas';
import type { SelectPostType } from '@/_types';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

interface UseCreatePostOptions extends MutationOptionsType<SelectPostType, CreatePostType> {}

/**
 * @description 새 포스트를 생성하는 커스텀 훅
 * @param {UseCreatePostOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useCreatePost(options: UseCreatePostOptions = {}) {
  const invalidateCache = useInvalidateAdminPostsCache();

  const mutation = usePost<SelectPostType, CreatePostType>({
    url: [
      'admin',
      'posts',
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
    ...options,
  });

  return mutation;
}
