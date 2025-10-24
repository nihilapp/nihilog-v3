import { toast } from 'sonner';

import { useInvalidateCommentsCache } from '@/_entities/comments/comments.keys';
import type { MutationOptionsType } from '@/_types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteCommentType } from '@/_schemas';

interface OptionType extends MutationOptionsType<boolean, DeleteCommentType> {}

/**
 * @description 댓글을 삭제하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useDeleteComment(options: OptionType = {}) {
  const invalidateCache = useInvalidateCommentsCache();

  const mutation = useDelete<boolean, DeleteCommentType>({
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
    ...options,
  });

  return mutation;
}
