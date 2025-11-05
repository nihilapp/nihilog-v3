import { useGet } from '@/_entities/common/hooks';
import type { SearchPostBookmarkType } from '@/_schemas';
import type { ListType, SelectPostBookmarkListItemType } from '@/_types';

/**
 * @description 북마크한 포스트 목록을 조회하는 커스텀 훅
 * @param {SearchPostBookmarkType} params - 검색 파라미터
 */
export function useGetBookmarkedPostListByUserNo(params: SearchPostBookmarkType) {
  const query = useGet<ListType<SelectPostBookmarkListItemType>>({
    url: [
      'posts',
      'bookmarks',
    ],
    params,
    callback(_res) {
    },
    errorCallback(_error) {},
  });

  return query;
}
