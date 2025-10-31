import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UnusedCategoryItemType } from '@/_types';

/**
 * @description 사용되지 않는 카테고리 목록을 조회하는 커스텀 훅
 */
export function useAdminGetUnusedCategories() {
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
  });

  return query;
}
