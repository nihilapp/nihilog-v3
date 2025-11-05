import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import { usePost } from '@/_entities/common/hooks';
import type { CreateCategoryType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

/**
 * @description 다수 카테고리를 일괄 생성하는 커스텀 훅
 */
export function useAdminMultipleCreateCategory() {
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = usePost<MultipleResultType, CreateCategoryType[]>({
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
