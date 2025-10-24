import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchCommentType } from '@/_schemas';
import type { ListType, SelectCommentListItemType } from '@/_types';

interface OptionType extends QueryOptionType<ListType<SelectCommentListItemType>> {
  searchData?: SearchCommentType;
}

/**
 * @description 댓글 목록을 조회하는 커스텀 훅
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCommentList(options: OptionType = {}) {
  const { searchData = {}, ...queryOptions } = options;

  const query = useGet<ListType<SelectCommentListItemType>>({
    url: [
      'comments',
      'search',
    ],
    params: searchData,
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
