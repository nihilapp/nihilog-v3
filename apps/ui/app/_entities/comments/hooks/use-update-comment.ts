import { toast } from 'sonner';

import { useInvalidateCommentsCache } from '@/_entities/comments/comments.keys';
import type { MutationOptionsType } from '@/_types';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateCommentType } from '@/_schemas';
import type { SelectCommentType } from '@/_types';

interface OptionType extends MutationOptionsType<SelectCommentType, UpdateCommentType> {}

/**
 * @description 댓글을 수정하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useUpdateComment(options: OptionType = {}) {
  const invalidateCache = useInvalidateCommentsCache();

  const mutation = usePut<SelectCommentType, UpdateCommentType>({
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
