import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchCategorySubscribeType } from '@/_schemas';
import type { ListType, SelectCategorySubscribeMappingListItemType } from '@/_types';

interface UseGetCategorySubscribeByCtgryNoOptions extends QueryOptionType<ListType<SelectCategorySubscribeMappingListItemType>> {
  ctgryNo: number;
  searchData?: SearchCategorySubscribeType;
}

/**
 * @description 특정 카테고리의 구독 상태를 조회하는 커스텀 훅
 * @param {UseGetCategorySubscribeByCtgryNoOptions} options - 쿼리 옵션
 */
export function useGetCategorySubscribeByCtgryNo(options: UseGetCategorySubscribeByCtgryNoOptions) {
  const { ctgryNo, searchData, ...restOptions } = options;

  const query = useGet<ListType<SelectCategorySubscribeMappingListItemType>>({
    url: [
      'users',
      'subscribes',
      'categories',
      ctgryNo.toString(),
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
    ...restOptions,
  });

  return query;
}
