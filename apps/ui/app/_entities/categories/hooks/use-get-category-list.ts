import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchCategoryType } from '@/_schemas/category.schema';
import type { ListType, SelectCategoryListItemType } from '@/_types';

interface UseGetCategoryListOptions extends QueryOptionType<ListType<SelectCategoryListItemType>> {
  searchData?: SearchCategoryType;
}

/**
 * @description 카테고리 목록을 조회하는 커스텀 훅
 * @param {UseGetCategoryListOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCategoryList(options: UseGetCategoryListOptions = {}) {
  const { searchData = {}, ...queryOptions } = options;

  const query = useGet<ListType<SelectCategoryListItemType>>({
    url: [
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
