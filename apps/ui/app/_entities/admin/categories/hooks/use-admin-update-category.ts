import { toast } from 'sonner';

import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_types';
import { usePut } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateCategoryType } from '@/_types';
import type { SelectCategoryType } from '@/_types';

interface OptionType extends MutationOptionsType<SelectCategoryType, UpdateCategoryType> {}

/**
 * @description 카테고리를 수정하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useAdminUpdateCategory(options: OptionType = {}) {
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = usePut<SelectCategoryType, UpdateCategoryType>({
    url: (variables) => [
      'admin',
      'categories',
      variables.ctgryNo?.toString() || '0',
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
