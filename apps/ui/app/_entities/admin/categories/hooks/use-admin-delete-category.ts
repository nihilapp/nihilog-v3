import { toast } from 'sonner';

import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';

interface OptionType extends MutationOptionsType<boolean, void> {
  ctgryNo: number;
}

/**
 * @description 카테고리를 삭제하는 커스텀 훅
 * @param {OptionType} options - 뮤테이션 옵션
 */
export function useAdminDeleteCategory(options: OptionType) {
  const { ctgryNo, ...mutationOptions } = options;
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = useDelete<boolean, void>({
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
