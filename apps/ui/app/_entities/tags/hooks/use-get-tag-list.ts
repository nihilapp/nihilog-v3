import { useGet } from '@/_entities/common/hooks';
import type { SearchTagType } from '@/_schemas';
import type { ListType, SelectTagInfoListItemType } from '@/_types';

/**
 * @description 태그 목록을 조회하는 커스텀 훅
 * @param {SearchTagType} [params] - 검색 파라미터 (선택사항)
 */
export function useGetTagList(params?: SearchTagType) {
  const query = useGet<ListType<SelectTagInfoListItemType>>({
    url: [ 'tags', ],
    params,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
