import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectCategoryType } from '@/_types';

interface OptionType extends QueryOptionType<SelectCategoryType> {}

/**
 * @description 카테고리 번호로 카테고리를 조회하는 커스텀 훅
 * @param {number} ctgryNo - 카테고리 번호
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCategoryByNo(ctgryNo: number, options: OptionType = {}) {
  const query = useGet<SelectCategoryType>({
    url: [
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
    ...options,
  });

  return query;
}
