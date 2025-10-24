import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateCommentType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminCommentsCache } from '../admin-comments.keys';

interface OptionType extends MutationOptionsType<MultipleResultType, UpdateCommentType> {}

/**
 * @description 관리자 댓글 일괄 수정하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminMultipleUpdateComment(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminCommentsCache();

  const mutation = usePut<MultipleResultType, UpdateCommentType>({
    url: [
      'admin',
      'comments',
      'multiple',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // Admin Comments 관련 캐시 무효화
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
