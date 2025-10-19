import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectCategoryType } from '@/_types';

interface OptionType extends QueryOptionType<SelectCategoryType> {
  name: string;
}

/**
 * @description 카테고리명으로 카테고리를 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetCategoryByName(options: OptionType) {
  const { name, ...queryOptions } = options;

  const query = useGet<SelectCategoryType>({
    url: [
      'admin',
      'categories',
      'name',
      name,
    ],
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
