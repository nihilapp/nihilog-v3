import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas';
import type { ListType, SelectPostListItemType } from '@/_types';

interface OptionType extends QueryOptionType<ListType<SelectPostListItemType>> {
  tagNo: number;
  params: SearchPostType;
}

/**
 * @description 태그별 포스트 목록을 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션, 태그 번호 및 검색 파라미터
 */
export function useGetPostListByTagNo(options: OptionType) {
  const { tagNo, params, ...queryOptions } = options;

  const query = useGet<ListType<SelectPostListItemType>>({
    url: [
      'posts',
      'tag',
      tagNo.toString(),
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
    ...queryOptions,
  });

  return query;
}
