import { useInvalidateCommentsCache } from '@/_entities/comments/comments.keys';
import { usePost } from '@/_entities/common/hooks';
import type { CreateCommentType } from '@/_schemas';
import type { SelectCommentType } from '@/_types';

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
