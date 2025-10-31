import { toast } from 'sonner';

import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';

/**
 * @description 카테고리를 삭제하는 커스텀 훅
 * @param {number} ctgryNo - 카테고리 번호
 */
export function useAdminDeleteCategory(ctgryNo: number) {
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = useDelete<boolean>({
    url: [
      'admin',
      'categories',
      ctgryNo.toString(),
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
