import { toast } from 'sonner';

import { useInvalidateCommentsCache } from '@/_entities/comments/comments.keys';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';

/**
 * @description 댓글을 삭제하는 커스텀 훅
 * @param {number} cmntNo - 댓글 번호
 */
export function useDeleteComment(cmntNo: number) {
  const invalidateCache = useInvalidateCommentsCache();

  const mutation = useDelete<boolean>({
    url: [
      'comments',
      cmntNo.toString(),
    ],
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
