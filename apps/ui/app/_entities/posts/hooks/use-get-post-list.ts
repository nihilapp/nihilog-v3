import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas';
import type { ListType, SelectPostListItemType } from '@/_types';

/**
 * @description 포스트 목록을 조회하는 커스텀 훅
 * @param {SearchPostType} params - 검색 파라미터
 */
export function useGetPostList(params: SearchPostType) {
  const query = useGet<ListType<SelectPostListItemType>>({
    url: [ 'posts', ],
    params,
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
