import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCommentsKeys } from '@/_entities/admin/comments/admin-comments.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { getToastStyle } from '@/_libs';
import type { UpdateCommentType, SearchCommentType } from '@/_schemas/comment.schema';
import type { MultipleResultType, SelectCommentType } from '@/_types';

interface UseAdminUpdateMultipleCommentsOptions extends MutationOptionsType<MultipleResultType<SelectCommentType>, UpdateCommentType[]> {}

/**
 * @description 관리자용 다수 댓글 수정을 위한 커스텀 훅
 * @param {UseAdminUpdateMultipleCommentsOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 댓글 수정 뮤테이션 객체
 */
export function useAdminUpdateMultipleComments(options: UseAdminUpdateMultipleCommentsOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<MultipleResultType<SelectCommentType>, UpdateCommentType[]>({
    url: [
      'admin', 'comments', 'multiple',
    ],
    key: adminCommentsKeys.updateMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 댓글 수정 성공 시 관련 쿼리 무효화
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
