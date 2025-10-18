import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchTagSubscribeType } from '@/_schemas';
import type { ListType, SelectTagSubscribeMappingListItemType } from '@/_types';

interface UseGetTagSubscribeListOptions extends QueryOptionType<ListType<SelectTagSubscribeMappingListItemType>> {
  searchData?: SearchTagSubscribeType;
}

/**
 * @description 사용자가 구독한 태그 목록을 조회하는 커스텀 훅
 * @param {UseGetTagSubscribeListOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetTagSubscribeList(options: UseGetTagSubscribeListOptions = {}) {
  const { searchData, ...restOptions } = options;

  const query = useGet<ListType<SelectTagSubscribeMappingListItemType>>({
    url: [
      'users',
      'subscribes',
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
    ...restOptions,
  });

  return query;
}
