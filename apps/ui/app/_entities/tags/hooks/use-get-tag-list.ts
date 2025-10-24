import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchTagType } from '@/_schemas';
import type { ListType, SelectTagInfoListItemType } from '@/_types';

interface OptionType extends QueryOptionType<ListType<SelectTagInfoListItemType>> {
  searchData?: SearchTagType;
}

/**
 * @description 태그 목록을 조회하는 커스텀 훅
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetTagList(options: OptionType = {}) {
  const { searchData = {}, ...queryOptions } = options;

  const query = useGet<ListType<SelectTagInfoListItemType>>({
    url: [
      'tags',
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
    enabled: !!searchData,
    ...queryOptions,
  });

  return query;
}
