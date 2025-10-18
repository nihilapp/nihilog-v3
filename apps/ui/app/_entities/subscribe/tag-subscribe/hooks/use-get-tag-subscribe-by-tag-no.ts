import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchTagSubscribeType } from '@/_schemas';
import type { ListType, SelectTagSubscribeMappingListItemType } from '@/_types';

interface UseGetTagSubscribeByTagNoOptions extends QueryOptionType<ListType<SelectTagSubscribeMappingListItemType>> {
  tagNo: number;
  searchData?: SearchTagSubscribeType;
}

/**
 * @description 특정 태그의 구독 상태를 조회하는 커스텀 훅
 * @param {UseGetTagSubscribeByTagNoOptions} options - 쿼리 옵션
 */
export function useGetTagSubscribeByTagNo(options: UseGetTagSubscribeByTagNoOptions) {
  const { tagNo, searchData, ...restOptions } = options;

  const query = useGet<ListType<SelectTagSubscribeMappingListItemType>>({
    url: [
      'users',
      'subscribes',
      'tags',
      tagNo.toString(),
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
