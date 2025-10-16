import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { commentsKeys } from '@/_entities/comments/comments.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { getToastStyle } from '@/_libs';
import type { SelectCommentType } from '@/_types';

interface UseUpdateCommentOptions extends MutationOptionsType<SelectCommentType> {
  commentNo?: number; // 댓글 번호 (댓글 상세 무효화용)
  pstNo?: number; // 포스트 번호 (댓글 목록 무효화용)
}

/**
 * @description 댓글 수정을 위한 커스텀 훅
 * @param {UseUpdateCommentOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 댓글 수정 뮤테이션 객체
 */
export function useUpdateComment(options: UseUpdateCommentOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePut<SelectCommentType, any>({
    url: [ 'comments', ],
    key: commentsKeys.update(options.commentNo!),
    callback() {
      toast.success('댓글이 수정되었습니다.', {
        style: getToastStyle('success'),
      });

      // 특정 댓글 상세 정보 무효화
      if (options.commentNo) {
        queryClient.invalidateQueries({
          queryKey: commentsKeys.byNo(options.commentNo).queryKey,
        });
      }

      // 특정 포스트의 댓글 목록 무효화
      if (options.pstNo) {
        queryClient.invalidateQueries({
          queryKey: commentsKeys.search({ pstNo: options.pstNo, }).queryKey,
        });
      }

      // 둘 다 없는 경우에만 전체 무효화 (fallback)
      if (!options.commentNo && !options.pstNo) {
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
