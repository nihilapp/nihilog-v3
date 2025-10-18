import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectCategoryType } from '@/_types';

interface UseGetCategoryByNoOptions extends QueryOptionType<SelectCategoryType> {
  ctgryNo: number;
}

/**
 * @description 카테고리 번호로 카테고리를 조회하는 커스텀 훅
 * @param {UseGetCategoryByNoOptions} options - 쿼리 옵션
 */
export function useGetCategoryByNo(options: UseGetCategoryByNoOptions) {
  const { ctgryNo, ...queryOptions } = options;

  const query = useGet<SelectCategoryType>({
    url: [
      'admin',
      'categories',
      ctgryNo.toString(),
    ],
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
