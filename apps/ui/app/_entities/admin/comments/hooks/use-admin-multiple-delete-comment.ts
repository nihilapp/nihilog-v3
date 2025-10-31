import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteCommentType } from '@/_types';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminCommentsCache } from '../admin-comments.keys';

interface OptionType extends MutationOptionsType<MultipleResultType, DeleteCommentType> {}

/**
 * @description 관리자 댓글 일괄 삭제하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminMultipleDeleteComment(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminCommentsCache();

  const mutation = useDelete<MultipleResultType, DeleteCommentType>({
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
