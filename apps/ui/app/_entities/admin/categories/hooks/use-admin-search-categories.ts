import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { SearchCategoryType } from '@/_schemas/category.schema';
import type { SelectCategoryListItemType } from '@/_types/category.types';

interface UseAdminSearchCategoriesOptions extends MutationOptionsType<{ list: SelectCategoryListItemType[]; totalCnt: number }, SearchCategoryType> {}

export function useAdminSearchCategories(options: UseAdminSearchCategoriesOptions = {}) {
  const query = usePost<{ list: SelectCategoryListItemType[]; totalCnt: number }, SearchCategoryType>({
    url: [
      'admin', 'categories', 'search',
    ],
    key: adminCategoriesKeys.searchCategories(),
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
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
