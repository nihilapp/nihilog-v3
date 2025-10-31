import { toast } from 'sonner';

import { useInvalidateCommentsCache } from '@/_entities/comments/comments.keys';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateCommentType } from '@/_schemas';
import type { SelectCommentType } from '@/_types';

/**
 * @description 새 댓글을 생성하는 커스텀 훅
 */
export function useCreateComment() {
  const invalidateCache = useInvalidateCommentsCache();

  const mutation = usePost<SelectCommentType, CreateCommentType>({
    url: [ 'comments', ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 댓글 관련 캐시 무효화
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
