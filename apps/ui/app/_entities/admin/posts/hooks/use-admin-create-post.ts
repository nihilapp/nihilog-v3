import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreatePostType } from '@/_schemas';
import type { SelectPostType } from '@/_types';

import { useInvalidateAdminPostsCache } from '../admin-posts.keys';

interface OptionType extends MutationOptionsType<SelectPostType, CreatePostType> {}

/**
 * @description 새 포스트를 생성하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminCreatePost(options: OptionType = {}) {
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
    ...options,
  });

  return mutation;
}
