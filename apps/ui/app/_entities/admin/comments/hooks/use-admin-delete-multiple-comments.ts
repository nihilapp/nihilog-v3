import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCommentsKeys } from '@/_entities/admin/comments/admin-comments.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';
import type { SearchCommentType } from '@/_schemas/comment.schema';
import type { MultipleResultType } from '@/_types';

interface UseAdminDeleteMultipleCommentsOptions extends MutationOptionsType<MultipleResultType<boolean>, number[]> {}

/**
 * @description 관리자용 다수 댓글 삭제를 위한 커스텀 훅
 * @param {UseAdminDeleteMultipleCommentsOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 댓글 삭제 뮤테이션 객체
 */
export function useAdminDeleteMultipleComments(options: UseAdminDeleteMultipleCommentsOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<MultipleResultType<boolean>, number[]>({
    url: [
      'admin', 'comments', 'multiple',
    ],
    key: adminCommentsKeys.deleteMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 댓글 삭제 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminCommentsKeys.search({} as SearchCommentType).queryKey,
      });
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
