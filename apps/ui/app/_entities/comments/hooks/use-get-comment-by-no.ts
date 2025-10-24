import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectCommentType } from '@/_types';

interface OptionType extends QueryOptionType<SelectCommentType> {}

/**
 * @description 댓글 번호로 댓글을 조회하는 커스텀 훅
 * @param {number} cmntNo - 댓글 번호
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCommentByNo(cmntNo: number, options: OptionType = {}) {
  const query = useGet<SelectCommentType>({
    url: [
      'comments',
      cmntNo.toString(),
    ],
    enabled: !!cmntNo,
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
    ...options,
  });

  return query;
}
