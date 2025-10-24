import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchPstTagMpngType } from '@/_schemas';
import type { ListType, SelectPostTagMappingListItemType } from '@/_types';

interface OptionType extends QueryOptionType<ListType<SelectPostTagMappingListItemType>> {}

/**
 * @description 태그 매핑을 조회하는 커스텀 훅
 * @param {SearchPstTagMpngType} searchData - 검색 데이터
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTagMapping(
  searchData: SearchPstTagMpngType,
  options: OptionType = {}
) {
  const query = useGet<ListType<SelectPostTagMappingListItemType>>({
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
    ...options,
  });

  return query;
}
