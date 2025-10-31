import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchCategorySubscribeType } from '@/_schemas';
import type { ListType, SelectCtgrySbcrMpngListItemType } from '@/_types';

/**
 * @description 특정 카테고리의 구독 상태를 조회하는 커스텀 훅
 * @param {number} ctgryNo - 카테고리 번호
 * @param {SearchCategorySubscribeType} [params] - 검색 파라미터 (선택사항)
 */
export function useGetCategorySubscribeByCtgryNo(ctgryNo: number, params?: SearchCategorySubscribeType) {
  const query = useGet<ListType<SelectCtgrySbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'categories',
      ctgryNo.toString(),
      'search',
    ],
    params,
    enabled: !!ctgryNo,
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
