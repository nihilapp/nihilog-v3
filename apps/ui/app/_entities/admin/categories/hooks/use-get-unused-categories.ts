import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UnusedCategoryItemType } from '@/_types';

interface UseGetUnusedCategoriesOptions extends QueryOptionType<UnusedCategoryItemType[]> {}

/**
 * @description 미사용 카테고리 목록을 조회하는 커스텀 훅
 * @param {UseGetUnusedCategoriesOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetUnusedCategories(options: UseGetUnusedCategoriesOptions = {}) {
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
