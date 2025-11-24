import type { DeleteCommentType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useDeletes } from '@/_hooks/common';

import { useInvalidateAdminCommentsCache } from '@/_keys/admin/comments/admin-comments.keys';

/**
 * @description 관리자 댓글 일괄 삭제하는 커스텀 훅
 */
export function useAdminMultipleDeleteComment() {
  const invalidateCache = useInvalidateAdminCommentsCache();

  const mutation = useDeletes<MultipleResultType, DeleteCommentType>({
    url: [
      'admin',
      'comments',
      'multiple',
    ],
    callback(_res) {
      // Admin Comments 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
