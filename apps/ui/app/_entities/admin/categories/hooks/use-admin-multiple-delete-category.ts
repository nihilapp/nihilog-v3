import type { DeleteCategoryType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import { useDeletes } from '@/_entities/common/hooks';

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
    callback(_res) {
      // 카테고리 관련 캐시 무효화
      invalidateCache();
    },
    errorCallback(_error) {},
  });

  return mutation;
}
