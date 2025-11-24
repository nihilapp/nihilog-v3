import { useInvalidateCommentsCache } from '@/_keys/comments/comments.keys';
import { useDelete } from '@/_hooks/common';

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
    callback(_res) {
      // 댓글 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
