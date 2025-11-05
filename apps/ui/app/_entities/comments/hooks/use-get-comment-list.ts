import { useGet } from '@/_entities/common/hooks';
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
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
