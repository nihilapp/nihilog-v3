import type { SelectCategoryType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 카테고리명으로 카테고리를 조회하는 커스텀 훅
 * @param {string} name - 카테고리명
 */
export function useAdminGetCategoryByName(name: string) {
  const query = useGet<SelectCategoryType>({
    url: [
      'admin',
      'categories',
      'name',
      name,
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
