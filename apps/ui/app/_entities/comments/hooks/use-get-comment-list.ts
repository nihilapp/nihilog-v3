import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchCommentType } from '@/_schemas';
import type { ListType, SelectCommentListItemType } from '@/_types';

/**
 * @description 댓글 목록을 조회하는 커스텀 훅
 * @param {SearchCommentType} [params] - 검색 파라미터 (선택사항)
 */
export function useGetCommentList(params?: SearchCommentType) {
  const query = useGet<ListType<SelectCommentListItemType>>({
    url: [ 'comments', ],
    params,
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
