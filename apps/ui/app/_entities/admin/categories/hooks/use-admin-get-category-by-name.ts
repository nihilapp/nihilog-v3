import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectCategoryType } from '@/_types';

/**
 * @description 카테고리명으로 카테고리를 조회하는 커스텀 훅
 * @param {string} name - 카테고리명
 */
export function useAdminGetCategoryByName(name: string) {
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
  });

  return query;
}
