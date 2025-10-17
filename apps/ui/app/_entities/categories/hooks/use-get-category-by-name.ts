import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectCategoryType } from '@/_types';

interface UseGetCategoryByNameOptions extends QueryOptionType<SelectCategoryType> {
  name: string;
}

/**
 * @description 카테고리명으로 카테고리를 조회하는 커스텀 훅
 * @param {UseGetCategoryByNameOptions} options - 쿼리 옵션
 */
export function useGetCategoryByName(options: UseGetCategoryByNameOptions) {
  const { name, ...queryOptions } = options;

  const query = useGet<SelectCategoryType>({
    url: [
      'categories', 'name', name,
    ],
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...queryOptions,
  });

  return query;
}
