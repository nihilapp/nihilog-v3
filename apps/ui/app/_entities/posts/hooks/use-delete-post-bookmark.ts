import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { useInvalidatePostsBookmarkCache } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { DeletePostBookmarkType } from '@/_schemas';

interface UseDeletePostBookmarkOptions extends MutationOptionsType<boolean, DeletePostBookmarkType> {
  pstNo: number;
  body: DeletePostBookmarkType;
}

/**
 * @description 포스트 북마크를 삭제하는 커스텀 훅
 * @param {UseDeletePostBookmarkOptions} options - 뮤테이션 옵션, 포스트 번호 및 Body 데이터
 */
export function useDeletePostBookmark(options: UseDeletePostBookmarkOptions) {
  const { pstNo, body, ...mutationOptions } = options;
  const invalidateCache = useInvalidatePostsBookmarkCache();

  const mutation = useDelete<boolean, DeletePostBookmarkType>({
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
