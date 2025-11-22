import type { SearchPostType } from '@nihilog/schemas';
import type { ListType, SelectPostListItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그별 포스트 목록을 조회하는 커스텀 훅
 * @param {number} tagNo - 태그 번호
 * @param {SearchPostType} params - 검색 파라미터
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetPostListByTagNo(tagNo: number, params: SearchPostType, enabled: boolean = true) {
  const query = useGet<ListType<SelectPostListItemType>>({
    url: [
      'posts',
      'tags',
      tagNo.toString(),
    ],
    params,
    enabled: enabled && !!tagNo,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
