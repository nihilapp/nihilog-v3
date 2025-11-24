import type { SearchCommentType } from '@nihilog/schemas';
import type { ListType, SelectCommentListItemType } from '@nihilog/schemas';

import { useGet } from '@/_hooks/common';

/**
 * @description 댓글 목록을 조회하는 커스텀 훅
 * @param {SearchCommentType} [params] - 검색 파라미터 (선택사항)
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetCommentList(params?: SearchCommentType, enabled: boolean = true) {
  const query = useGet<ListType<SelectCommentListItemType>>({
    url: [ 'comments', ],
    params,
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
