import { toast } from 'sonner';

import { commentsKeys } from '@/_entities/comments/comments.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { SearchCommentType } from '@/_schemas/comment.schema';
import type { ListType, SelectCommentListItemType } from '@/_types';

interface UseGetCommentsOptions extends QueryOptionType<ListType<SelectCommentListItemType>> {}

/**
 * @description 댓글 목록 조회를 위한 커스텀 훅 (POST 방식)
 * @param {UseGetCommentsOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 댓글 목록 조회 쿼리 객체
 */
export function useGetComments(options: UseGetCommentsOptions = {}) {
  const query = usePost<ListType<SelectCommentListItemType>, SearchCommentType>({
    url: [
      'comments', 'search',
    ],
    key: commentsKeys.commentList({} as SearchCommentType), // 기본값으로 빈 객체 사용
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
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
