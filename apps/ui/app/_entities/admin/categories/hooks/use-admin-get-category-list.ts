import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchCategoryType } from '@/_types';
import type { ListType, SelectCategoryListItemType } from '@/_types';

interface OptionType extends QueryOptionType<ListType<SelectCategoryListItemType>> {
  searchData: SearchCategoryType;
}

/**
 * @description 카테고리 목록을 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetCategoryList(options: OptionType) {
  const { searchData, ...queryOptions } = options;

  const query = useGet<ListType<SelectCategoryListItemType>>({
    url: [
      'admin',
      'categories',
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
    ...queryOptions,
  });

  return query;
}
