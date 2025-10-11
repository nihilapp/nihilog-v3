import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { commentsKeys } from '@/_entities/comments/comments.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { SelectCommentType } from '@/_types';

interface UseCreateCommentOptions extends MutationOptionsType<SelectCommentType> {
  postNo?: number; // 게시글 번호 (댓글 목록 무효화용)
}

/**
 * @description 댓글 생성을 위한 커스텀 훅
 * @param {UseCreateCommentOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 댓글 생성 뮤테이션 객체
 */
export function useCreateComment(options: UseCreateCommentOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePost<SelectCommentType, any>({
    url: [ 'comments', ],
    key: commentsKeys.createComment(),
    callback() {
      toast.success('댓글이 작성되었습니다.', {
        style: getToastStyle('success'),
      });

      // 특정 게시글의 댓글 목록만 무효화
      if (options.postNo) {
        queryClient.invalidateQueries({
          queryKey: commentsKeys.commentList({ pstNo: options.postNo, }).queryKey,
        });
      }
      else {
        // postNo가 없는 경우에만 전체 무효화 (fallback)
        queryClient.invalidateQueries({
          queryKey: commentsKeys.all().queryKey,
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
