import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas';
import type { ListType, SelectPostListItemType } from '@/_types';

interface OptionType extends QueryOptionType<ListType<SelectPostListItemType>> {
  params: SearchPostType;
}

/**
 * @description 고급 검색으로 포스트 목록을 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션 및 검색 파라미터
 */
export function useGetAdvancedPostList(options: OptionType) {
  const { params, ...queryOptions } = options;

  const query = useGet<ListType<SelectPostListItemType>>({
    url: [
      'posts',
      'advanced-search',
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
    ...queryOptions,
  });

  return query;
}
