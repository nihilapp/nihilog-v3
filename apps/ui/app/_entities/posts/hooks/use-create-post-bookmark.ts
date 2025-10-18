import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { useInvalidatePostsBookmarkCache } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { CreatePostBookmarkType } from '@/_schemas';
import type { SelectPostBookmarkType } from '@/_types';

interface UseCreatePostBookmarkOptions extends MutationOptionsType<SelectPostBookmarkType, CreatePostBookmarkType> {
  pstNo: number;
  body: CreatePostBookmarkType;
}

/**
 * @description 포스트 북마크를 생성하는 커스텀 훅
 * @param {UseCreatePostBookmarkOptions} options - 뮤테이션 옵션, 포스트 번호 및 Body 데이터
 */
export function useCreatePostBookmark(options: UseCreatePostBookmarkOptions) {
  const { pstNo, body, ...mutationOptions } = options;
  const invalidateCache = useInvalidatePostsBookmarkCache();

  const mutation = usePost<SelectPostBookmarkType, CreatePostBookmarkType>({
    url: [
      'posts',
      pstNo.toString(),
      'bookmark',
    ],
    body,
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
    ...mutationOptions,
  });

  return mutation;
}
