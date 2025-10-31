import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
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
  });

  return query;
}
