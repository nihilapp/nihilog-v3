import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas';
import type { ListType, SelectPostListItemType } from '@/_types';

interface OptionType extends QueryOptionType<ListType<SelectPostListItemType>> {
  date: string;
  params: SearchPostType;
}

/**
 * @description 년월별 포스트 목록을 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션, 날짜 및 검색 파라미터
 */
export function useGetPostListFromArchive(options: OptionType) {
  const { date, params, ...queryOptions } = options;

  const query = useGet<ListType<SelectPostListItemType>>({
    url: [
      'posts',
      'archive',
      date,
    ],
    params,
    enabled: !!date,
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
    ...queryOptions,
  });

  return query;
}
