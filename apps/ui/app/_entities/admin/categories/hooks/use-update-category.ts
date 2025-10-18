import { toast } from 'sonner';

import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePatch } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UpdateCategoryType } from '@/_schemas';
import type { SelectCategoryType } from '@/_types';

interface UseUpdateCategoryOptions extends MutationOptionsType<SelectCategoryType, UpdateCategoryType> {
  ctgryNo: number;
}

/**
 * @description 카테고리를 수정하는 커스텀 훅
 * @param {UseUpdateCategoryOptions} options - 뮤테이션 옵션
 */
export function useUpdateCategory(options: UseUpdateCategoryOptions) {
  const { ctgryNo, ...mutationOptions } = options;
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = usePatch<SelectCategoryType, UpdateCategoryType>({
    url: [
      'admin',
      'categories',
      ctgryNo.toString(),
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
    ...mutationOptions,
  });

  return mutation;
}
