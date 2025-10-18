import { toast } from 'sonner';

import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { DeleteCategoryType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

interface UseMultipleDeleteCategoryOptions extends MutationOptionsType<MultipleResultType, DeleteCategoryType> {}

/**
 * @description 다수 카테고리를 삭제하는 커스텀 훅
 * @param {UseMultipleDeleteCategoryOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useMultipleDeleteCategory(options: UseMultipleDeleteCategoryOptions = {}) {
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = useDelete<MultipleResultType, DeleteCategoryType>({
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
    ...options,
  });

  return mutation;
}
