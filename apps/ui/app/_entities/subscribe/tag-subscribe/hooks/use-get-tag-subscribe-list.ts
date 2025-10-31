import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchTagSubscribeType } from '@/_schemas';
import type { ListType, SelectTagSbcrMpngListItemType } from '@/_types';

/**
 * @description 사용자가 구독한 태그 목록을 조회하는 커스텀 훅
 * @param {SearchTagSubscribeType} [params] - 검색 파라미터 (선택사항)
 */
export function useGetTagSubscribeList(params?: SearchTagSubscribeType) {
  const query = useGet<ListType<SelectTagSbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'tags',
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
