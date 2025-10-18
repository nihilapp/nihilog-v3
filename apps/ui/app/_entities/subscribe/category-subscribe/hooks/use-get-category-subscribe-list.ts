import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchCategorySubscribeType } from '@/_schemas';
import type { ListType, SelectCategorySubscribeMappingListItemType } from '@/_types';

interface UseGetCategorySubscribeListOptions extends QueryOptionType<ListType<SelectCategorySubscribeMappingListItemType>> {
  searchData?: SearchCategorySubscribeType;
}

/**
 * @description 사용자가 구독한 카테고리 목록을 조회하는 커스텀 훅
 * @param {UseGetCategorySubscribeListOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCategorySubscribeList(options: UseGetCategorySubscribeListOptions = {}) {
  const { searchData, ...restOptions } = options;

  const query = useGet<ListType<SelectCategorySubscribeMappingListItemType>>({
    url: [
      'users',
      'subscribes',
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
    ...restOptions,
  });

  return query;
}
