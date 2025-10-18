import { toast } from 'sonner';

import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePatch } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateCategoryType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

interface UseMultipleUpdateCategoryOptions extends MutationOptionsType<MultipleResultType, UpdateCategoryType & { ctgryNoList: number[] }> {}

/**
 * @description 다수 카테고리를 수정하는 커스텀 훅
 * @param {UseMultipleUpdateCategoryOptions} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useMultipleUpdateCategory(options: UseMultipleUpdateCategoryOptions = {}) {
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = usePatch<MultipleResultType, UpdateCategoryType & { ctgryNoList: number[] }>({
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
