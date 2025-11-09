import type { SelectCommentType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 댓글 번호로 댓글을 조회하는 커스텀 훅
 * @param {number} cmntNo - 댓글 번호
 */
export function useGetCommentByNo(cmntNo: number) {
  const query = useGet<SelectCommentType>({
    url: [
      'comments',
      cmntNo.toString(),
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
