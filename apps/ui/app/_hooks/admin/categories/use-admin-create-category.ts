import type { CreateCategoryType } from '@nihilog/schemas';
import type { SelectCategoryType } from '@nihilog/schemas';

import { useInvalidateAdminCategoriesCache } from '@/_keys/admin/categories/admin-categories.keys';
import { usePost } from '@/_hooks/common';

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
