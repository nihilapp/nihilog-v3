import { toast } from 'sonner';

import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import { useDeletes } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteCategoryType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

/**
 * @description 다수 카테고리를 일괄 삭제하는 커스텀 훅
 */
export function useAdminMultipleDeleteCategory() {
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = useDeletes<MultipleResultType, DeleteCategoryType>({
    url: [
      'admin',
      'categories',
      'multiple',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );

      // 카테고리 관련 캐시 무효화
      invalidateCache();
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

  return mutation;
}
