import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { SelectCategoryType } from '@/_types/category.types';

interface UseAdminGetCategoryByNameOptions extends QueryOptionType<SelectCategoryType> {}

export function useAdminGetCategoryByName(name: string, options: UseAdminGetCategoryByNameOptions = {}) {
  const query = useGet<SelectCategoryType>({
    url: [
      'admin', 'categories', 'name', name,
    ],
    key: adminCategoriesKeys.byName(name),
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
