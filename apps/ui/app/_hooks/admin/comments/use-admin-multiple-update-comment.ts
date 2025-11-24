import type { UpdateCommentType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { usePatch } from '@/_hooks/common';

import { useInvalidateAdminCommentsCache } from '../admin-comments.keys';

/**
 * @description 관리자 댓글 일괄 수정하는 커스텀 훅
 */
export function useAdminMultipleUpdateComment() {
  const invalidateCache = useInvalidateAdminCommentsCache();

  const mutation = usePatch<MultipleResultType, UpdateCommentType>({
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
