import type { UpdateCommentType } from '@nihilog/schemas';
import type { SelectCommentType } from '@nihilog/schemas';

import { useInvalidateCommentsCache } from '@/_keys/comments/comments.keys';
import { usePut } from '@/_hooks/common';

/**
 * @description 댓글을 수정하는 커스텀 훅
 * @param {number} cmntNo - 댓글 번호
 */
export function useUpdateComment(cmntNo: number) {
  const invalidateCache = useInvalidateCommentsCache();

  const mutation = usePut<SelectCommentType, UpdateCommentType>({
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
