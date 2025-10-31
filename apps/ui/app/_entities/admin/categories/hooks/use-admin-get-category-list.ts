import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchCategoryType } from '@/_schemas';
import type { ListType, SelectCategoryListItemType } from '@/_types';

/**
 * @description 카테고리 목록을 조회하는 커스텀 훅
 * @param {SearchCategoryType} searchData - 검색 데이터
 */
export function useAdminGetCategoryList(searchData: SearchCategoryType) {
  const query = useGet<ListType<SelectCategoryListItemType>>({
    url: [
      'admin',
      'categories',
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
