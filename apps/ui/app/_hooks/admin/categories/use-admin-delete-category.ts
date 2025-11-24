import { useInvalidateAdminCategoriesCache } from '@/_keys/admin/categories/admin-categories.keys';
import { useDelete } from '@/_hooks/common';

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
    callback(_res) {
      // 카테고리 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
