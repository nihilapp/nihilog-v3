import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchCategorySubscribeType } from '@/_schemas';
import type { ListType, SelectCtgrySbcrMpngListItemType } from '@/_types';

/**
 * @description 사용자가 구독한 카테고리 목록을 조회하는 커스텀 훅
 * @param {SearchCategorySubscribeType} [params] - 검색 파라미터 (선택사항)
 */
export function useGetCategorySubscribeList(params?: SearchCategorySubscribeType) {
  const query = useGet<ListType<SelectCtgrySbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'categories',
      'search',
    ],
    params,
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
