import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchPstTagMpngType } from '@/_schemas';
import type { ListType, SelectPstTagMpngListItemType } from '@/_types';

/**
 * @description 태그 매핑을 조회하는 커스텀 훅
 * @param {SearchPstTagMpngType} searchData - 검색 데이터
 */
export function useAdminGetTagMapping(searchData: SearchPstTagMpngType) {
  const query = useGet<ListType<SelectPstTagMpngListItemType>>({
    url: [
      'admin',
      'tags',
      'mapping',
      'search',
    ],
    params: searchData,
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
