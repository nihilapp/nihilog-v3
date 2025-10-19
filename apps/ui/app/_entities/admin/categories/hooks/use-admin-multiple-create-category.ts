import { toast } from 'sonner';

import { useInvalidateAdminCategoriesCache } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreateCategoryType } from '@/_schemas';
import type { MultipleResultType } from '@/_types';

interface OptionType extends MutationOptionsType<MultipleResultType, CreateCategoryType> {}

/**
 * @description 다수 카테고리를 일괄 생성하는 커스텀 훅
 * @param {OptionType} options - 뮤테이션 옵션
 */
export function useAdminMultipleCreateCategory(options: OptionType) {
  const invalidateCache = useInvalidateAdminCategoriesCache();

  const mutation = usePost<MultipleResultType, CreateCategoryType>({
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
