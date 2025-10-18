import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectCommentType } from '@/_types';

interface UseGetCommentByNoOptions extends QueryOptionType<SelectCommentType> {
  cmntNo: number;
}

/**
 * @description 댓글 번호로 댓글을 조회하는 커스텀 훅
 * @param {UseGetCommentByNoOptions} options - 쿼리 옵션
 */
export function useGetCommentByNo(options: UseGetCommentByNoOptions) {
  const { cmntNo, ...queryOptions } = options;

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
    ...queryOptions,
  });

  return query;
}
