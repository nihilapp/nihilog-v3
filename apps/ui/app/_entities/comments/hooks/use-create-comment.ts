import type { CreateCommentType } from '@nihilog/schemas';
import type { SelectCommentType } from '@nihilog/schemas';

import { useInvalidateCommentsCache } from '@/_entities/comments/comments.keys';
import { usePost } from '@/_entities/common/hooks';

/**
 * @description 새 댓글을 생성하는 커스텀 훅
 */
export function useCreateComment() {
  const invalidateCache = useInvalidateCommentsCache();

  const mutation = usePost<SelectCommentType, CreateCommentType>({
    url: [ 'comments', ],
    callback(_res) {
      // 댓글 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
