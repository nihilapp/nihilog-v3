import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectPostType } from '@/_types';

interface UseGetPostByNoOptions extends QueryOptionType<SelectPostType> {
  pstNo: number;
}

/**
 * @description 포스트 번호로 포스트를 조회하는 커스텀 훅
 * @param {UseGetPostByNoOptions} options - 쿼리 옵션 및 포스트 번호
 */
export function useGetPostByNo(options: UseGetPostByNoOptions) {
  const { pstNo, ...queryOptions } = options;

  const query = useGet<SelectPostType>({
    url: [
      'posts',
      pstNo.toString(),
    ],
    enabled: !!pstNo,
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
