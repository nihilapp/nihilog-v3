import { toast } from 'sonner';

import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateCategoryType } from '@/_schemas';
import type { SelectCategoryType } from '@/_types';

/**
 * @description 카테고리를 생성하는 커스텀 훅
 */
export function useAdminCreateCategory() {
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = usePost<SelectCategoryType, CreateCategoryType>({
    url: [
      'admin',
      'categories',
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
