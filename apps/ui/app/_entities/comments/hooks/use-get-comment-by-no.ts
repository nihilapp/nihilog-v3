import { toast } from 'sonner';

import { commentsKeys } from '@/_entities/comments/comments.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { SelectCommentType } from '@/_types';

interface UseGetCommentByNoOptions extends QueryOptionType<SelectCommentType> {}

/**
 * @description 댓글 번호로 특정 댓글 조회를 위한 커스텀 훅
 * @param {number} cmntNo - 조회할 댓글 번호
 * @param {UseGetCommentByNoOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 댓글 조회 쿼리 객체
 */
export function useGetCommentByNo(cmntNo: number, options: UseGetCommentByNoOptions = {}) {
  const query = useGet<SelectCommentType>({
    url: [
      'comments', cmntNo,
    ],
    key: commentsKeys.byNo(cmntNo),
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
