import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas';
import type { ListType, SelectPostListItemType } from '@/_types';

interface UseGetPostListOptions extends QueryOptionType<ListType<SelectPostListItemType>> {
  params: SearchPostType;
}

/**
 * @description 포스트 목록을 조회하는 커스텀 훅
 * @param {UseGetPostListOptions} options - 쿼리 옵션 및 검색 파라미터
 */
export function useGetPostList(options: UseGetPostListOptions) {
  const { params, ...queryOptions } = options;

  const query = useGet<ListType<SelectPostListItemType>>({
    url: [
      'posts',
      'search',
    ],
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
    ...queryOptions,
  });

  return query;
}
