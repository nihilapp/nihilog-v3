import type { UpdateCategoryType } from '@nihilog/schemas';
import type { MultipleResultType } from '@nihilog/schemas';

import { useInvalidateAdminCategoriesCache } from '@/_keys/admin/categories/admin-categories.keys';
import { usePatch } from '@/_hooks/common';

/**
 * @description 다수 카테고리를 일괄 수정하는 커스텀 훅
 */
export function useAdminMultipleUpdateCategory() {
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = usePatch<MultipleResultType, UpdateCategoryType & { ctgryNoList: number[] }>({
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
