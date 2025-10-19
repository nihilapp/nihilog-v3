import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UnusedCategoryItemType } from '@/_types';

interface OptionType extends QueryOptionType<UnusedCategoryItemType[]> {}

/**
 * @description 사용되지 않는 카테고리 목록을 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetUnusedCategories(options: OptionType) {
  const query = useGet<UnusedCategoryItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'unused',
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
    ...options,
  });

  return query;
}
