import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas';
import type { ListType, SelectPostListItemType } from '@/_types';

interface UseGetPostListByCtgryNoOptions extends QueryOptionType<ListType<SelectPostListItemType>> {
  ctgryNo: number;
  params: SearchPostType;
}

/**
 * @description 카테고리별 포스트 목록을 조회하는 커스텀 훅
 * @param {UseGetPostListByCtgryNoOptions} options - 쿼리 옵션, 카테고리 번호 및 검색 파라미터
 */
export function useGetPostListByCtgryNo(options: UseGetPostListByCtgryNoOptions) {
  const { ctgryNo, params, ...queryOptions } = options;

  const query = useGet<ListType<SelectPostListItemType>>({
    url: [
      'posts',
      'category',
      ctgryNo.toString(),
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
    ...queryOptions,
  });

  return query;
}
