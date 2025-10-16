import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePatch } from '@/_entities/common/hooks/api/use-patch';
import { getToastStyle } from '@/_libs';
import type { UpdateCategoryType } from '@/_schemas/category.schema';
import type { MultipleResultType } from '@/_types/common.types';

interface UseAdminUpdateMultipleCategoriesOptions extends MutationOptionsType<MultipleResultType, UpdateCategoryType & { ctgryNoList: number[] }> {}

export function useAdminUpdateMultipleCategories(options: UseAdminUpdateMultipleCategoriesOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePatch<MultipleResultType, UpdateCategoryType & { ctgryNoList: number[] }>({
    url: [
      'admin', 'categories', 'multiple',
    ],
    key: adminCategoriesKeys.updateMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 카테고리 수정 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminCategoriesKeys.search().queryKey,
      });
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
