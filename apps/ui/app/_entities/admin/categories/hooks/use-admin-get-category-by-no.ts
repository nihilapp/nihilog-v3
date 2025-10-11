import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { SelectCategoryInfoType } from '@/_types';

interface UseAdminGetCategoryByNoOptions extends QueryOptionType<SelectCategoryInfoType> {}

/**
 * @description 관리자용 카테고리 번호로 조회를 위한 커스텀 훅
 * @param {number} ctgryNo - 조회할 카테고리 번호
 * @param {UseAdminGetCategoryByNoOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 카테고리 조회 쿼리 객체
 */
export function useAdminGetCategoryByNo(ctgryNo: number, options: UseAdminGetCategoryByNoOptions = {}) {
  const query = useGet<SelectCategoryInfoType>({
    url: [
      'admin', 'categories', ctgryNo,
    ],
    key: adminCategoriesKeys.categoryByNo(ctgryNo),
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
