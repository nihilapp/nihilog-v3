import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { CreateCategoryType } from '@/_schemas/category.schema';
import type { MultipleResultType } from '@/_types/common.types';

interface UseAdminCreateMultipleCategoriesOptions extends MutationOptionsType<MultipleResultType, CreateCategoryType[]> {}

export function useAdminCreateMultipleCategories(options: UseAdminCreateMultipleCategoriesOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePost<MultipleResultType, CreateCategoryType[]>({
    url: [
      'admin', 'categories', 'multiple',
    ],
    key: adminCategoriesKeys.createMultipleCategories(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 카테고리 생성 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminCategoriesKeys.searchCategories().queryKey,
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
