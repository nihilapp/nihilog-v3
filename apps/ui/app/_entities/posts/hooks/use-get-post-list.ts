import type { SearchPostType } from '@nihilog/schemas';
import type { ListType, SelectPostListItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 포스트 목록을 조회하는 커스텀 훅
 * @param {SearchPostType} params - 검색 파라미터
 */
export function useGetPostList(params: SearchPostType) {
  const query = useGet<ListType<SelectPostListItemType>>({
    url: [ 'posts', ],
    params,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
