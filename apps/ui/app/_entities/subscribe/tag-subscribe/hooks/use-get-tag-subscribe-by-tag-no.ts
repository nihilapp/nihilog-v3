import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchTagSubscribeType } from '@/_schemas';
import type { ListType, SelectTagSbcrMpngListItemType } from '@/_types';

/**
 * @description 특정 태그의 구독 상태를 조회하는 커스텀 훅
 * @param {number} tagNo - 태그 번호
 * @param {SearchTagSubscribeType} [params] - 검색 파라미터 (선택사항)
 */
export function useGetTagSubscribeByTagNo(tagNo: number, params?: SearchTagSubscribeType) {
  const query = useGet<ListType<SelectTagSbcrMpngListItemType>>({
    url: [
      'users',
      'subscribes',
      'tags',
      tagNo.toString(),
      'search',
    ],
    params,
    enabled: !!tagNo,
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
