import { toast } from 'sonner';

import { useDeletes } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteCommentType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

import { useInvalidateAdminCommentsCache } from '../admin-comments.keys';

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
  });

  return mutation;
}
