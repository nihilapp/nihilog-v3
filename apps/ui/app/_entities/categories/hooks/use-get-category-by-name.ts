import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectCategoryType } from '@/_types';

interface OptionType extends QueryOptionType<SelectCategoryType> {}

/**
 * @description 카테고리명으로 카테고리를 조회하는 커스텀 훅
 * @param {string} name - 카테고리명
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCategoryByName(name: string, options: OptionType = {}) {
  const query = useGet<SelectCategoryType>({
    url: [
      'categories',
      'name',
      name,
    ],
    enabled: !!name,
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
