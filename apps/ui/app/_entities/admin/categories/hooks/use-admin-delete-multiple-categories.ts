import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';
import type { DeleteCategoryType } from '@/_schemas/category.schema';
import type { MultipleResultType } from '@/_types/common.types';

interface UseAdminDeleteMultipleCategoriesOptions extends MutationOptionsType<MultipleResultType, DeleteCategoryType> {}

export function useAdminDeleteMultipleCategories(options: UseAdminDeleteMultipleCategoriesOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<MultipleResultType, DeleteCategoryType>({
    url: [
      'admin', 'categories', 'multiple',
    ],
    key: adminCategoriesKeys.deleteMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 카테고리 삭제 성공 시 관련 쿼리 무효화
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
