import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePost } from '@/_entities/common/hooks';
import { useInvalidatePostsBookmarkCache } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { CreatePostBookmarkType } from '@/_schemas';
import type { SelectPostBookmarkType } from '@/_types';

interface OptionType extends MutationOptionsType<SelectPostBookmarkType, CreatePostBookmarkType> {}

/**
 * @description 포스트 북마크를 생성하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useCreatePostBookmark(options: OptionType = {}) {
  const invalidateCache = useInvalidatePostsBookmarkCache();

  const mutation = usePost<SelectPostBookmarkType, CreatePostBookmarkType>({
    url: (variables) => [
      'posts',
      variables.pstNo?.toString() || '0',
      'bookmark',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 북마크 관련 캐시 무효화
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
