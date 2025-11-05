import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import { usePatch } from '@/_entities/common/hooks';
import type { UpdateCategoryType } from '@/_schemas';
import type { SelectCategoryType } from '@/_types';

/**
 * @description 카테고리를 수정하는 커스텀 훅
 * @param {number} ctgryNo - 카테고리 번호
 */
export function useAdminUpdateCategory(ctgryNo: number) {
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = usePatch<SelectCategoryType, UpdateCategoryType>({
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
