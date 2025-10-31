import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectCommentType } from '@/_types';

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
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
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

  return query;
}
