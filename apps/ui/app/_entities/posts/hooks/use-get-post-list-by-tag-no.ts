import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas';
import type { ListType, SelectPostListItemType } from '@/_types';

/**
 * @description 태그별 포스트 목록을 조회하는 커스텀 훅
 * @param {number} tagNo - 태그 번호
 * @param {SearchPostType} params - 검색 파라미터
 */
export function useGetPostListByTagNo(tagNo: number, params: SearchPostType) {
  const query = useGet<ListType<SelectPostListItemType>>({
    url: [
      'posts',
      'tags',
      tagNo.toString(),
    ],
    params,
    enabled: !!tagNo,
    callback(_res) {
      //
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  return query;
}
