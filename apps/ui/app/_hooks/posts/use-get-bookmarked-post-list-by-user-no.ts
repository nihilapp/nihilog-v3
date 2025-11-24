import type { SearchPostBookmarkType } from '@nihilog/schemas';
import type { ListType, SelectPostBookmarkListItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 북마크한 포스트 목록을 조회하는 커스텀 훅
 * @param {SearchPostBookmarkType} params - 검색 파라미터
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetBookmarkedPostListByUserNo(params: SearchPostBookmarkType, enabled: boolean = true) {
  const query = useGet<ListType<SelectPostBookmarkListItemType>>({
    url: [
      'posts',
      'bookmarks',
    ],
    params,
    enabled,
    callback(_res) {
    },
    errorCallback(_error) {},
  });

  return query;
}
