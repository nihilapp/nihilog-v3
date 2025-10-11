import { toast } from 'sonner';

import { categoriesKeys } from '@/_entities/categories/categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { SelectCategoryType } from '@/_types';

interface UseGetCategoryByNoOptions extends QueryOptionType<SelectCategoryType> {}

/**
 * @description 카테고리 번호로 특정 카테고리 조회를 위한 커스텀 훅
 * @param {number} ctgryNo - 조회할 카테고리 번호
 * @param {UseGetCategoryByNoOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 카테고리 조회 쿼리 객체
 */
export function useGetCategoryByNo(ctgryNo: number, options: UseGetCategoryByNoOptions = {}) {
  const query = useGet<SelectCategoryType>({
    url: [
      'categories', ctgryNo,
    ],
    key: categoriesKeys.categoryByNo(ctgryNo),
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
