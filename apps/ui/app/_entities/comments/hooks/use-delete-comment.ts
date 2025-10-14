import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { commentsKeys } from '@/_entities/comments/comments.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';

interface UseDeleteCommentOptions extends MutationOptionsType<boolean> {
  commentNo?: number; // 댓글 번호 (댓글 상세 무효화용)
  postNo?: number; // 게시글 번호 (댓글 목록 무효화용)
}

/**
 * @description 댓글 삭제를 위한 커스텀 훅
 * @param {UseDeleteCommentOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 댓글 삭제 뮤테이션 객체
 */
export function useDeleteComment(options: UseDeleteCommentOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = useDelete<boolean, any>({
    url: [ 'comments', ],
    key: commentsKeys.delete(options.commentNo!),
    callback() {
      toast.success('댓글이 삭제되었습니다.', {
        style: getToastStyle('success'),
      });

      // 특정 댓글 상세 정보 무효화
      if (options.commentNo) {
        queryClient.invalidateQueries({
          queryKey: commentsKeys.byNo(options.commentNo).queryKey,
        });
      }

      // 특정 게시글의 댓글 목록 무효화
      if (options.postNo) {
        queryClient.invalidateQueries({
          queryKey: commentsKeys.search({ pstNo: options.postNo, }).queryKey,
        });
      }

      // 둘 다 없는 경우에만 전체 무효화 (fallback)
      if (!options.commentNo && !options.postNo) {
        queryClient.invalidateQueries({
          queryKey: commentsKeys.search({}).queryKey,
        });
      }
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return mutation;
}
