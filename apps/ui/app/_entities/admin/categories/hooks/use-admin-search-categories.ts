import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { getToastStyle } from '@/_libs';
import type { SearchCategoryType } from '@/_schemas/category.schema';
import type { SelectCategoryListItemType } from '@/_types/category.types';

interface UseAdminSearchCategoriesOptions extends QueryOptionType<{ list: SelectCategoryListItemType[]; totalCnt: number }> {
  searchParams?: SearchCategoryType;
}

export function useAdminSearchCategories(options: UseAdminSearchCategoriesOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<{ list: SelectCategoryListItemType[]; totalCnt: number }, SearchCategoryType>({
    url: [
      'admin', 'categories', 'search',
    ],
    key: adminCategoriesKeys.search(searchParams),
    body: searchParams,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    options: queryOptions,
  });

  return query;
}
