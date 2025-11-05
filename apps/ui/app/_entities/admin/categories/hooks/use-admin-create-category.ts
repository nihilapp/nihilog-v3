import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import { usePost } from '@/_entities/common/hooks';
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
    callback(_res) {
      // 카테고리 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
