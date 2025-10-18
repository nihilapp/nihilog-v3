import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchPostBookmarkType } from '@/_schemas';
import type { ListType, SelectPostBookmarkListItemType } from '@/_types';

interface UseGetBookmarkedPostListByUserNoOptions extends QueryOptionType<ListType<SelectPostBookmarkListItemType>> {
  params: SearchPostBookmarkType;
}

/**
 * @description 북마크한 포스트 목록을 조회하는 커스텀 훅
 * @param {UseGetBookmarkedPostListByUserNoOptions} options - 쿼리 옵션 및 검색 파라미터
 */
export function useGetBookmarkedPostListByUserNo(options: UseGetBookmarkedPostListByUserNoOptions) {
  const { params, ...queryOptions } = options;

  const query = useGet<ListType<SelectPostBookmarkListItemType>>({
    url: [
      'posts',
      'bookmarked',
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
