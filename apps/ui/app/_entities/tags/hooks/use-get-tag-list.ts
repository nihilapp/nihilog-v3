import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchTagType } from '@/_schemas';
import type { ListType, SelectTagInfoListItemType } from '@/_types';

interface UseGetTagListOptions extends QueryOptionType<ListType<SelectTagInfoListItemType>> {
  searchData: SearchTagType;
}

/**
 * @description 태그 목록을 조회하는 커스텀 훅
 * @param {UseGetTagListOptions} options - 쿼리 옵션 및 검색 데이터
 */
export function useGetTagList(options: UseGetTagListOptions) {
  const { searchData, ...queryOptions } = options;

  const query = useGet<ListType<SelectTagInfoListItemType>>({
    url: [
      'tags',
      'search',
    ],
    params: searchData,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...queryOptions,
  });

  return query;
}
