import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePatch } from '@/_entities/common/hooks/api/use-patch';
import { getToastStyle } from '@/_libs';
import type { UpdateCategoryType } from '@/_schemas/category.schema';
import type { SelectCategoryType } from '@/_types';

interface UseAdminUpdateCategoryOptions extends MutationOptionsType<SelectCategoryType, UpdateCategoryType> {}

/**
 * @description 관리자용 카테고리 수정을 위한 커스텀 훅
 * @param {number} ctgryNo - 수정할 카테고리 번호
 * @param {UseAdminUpdateCategoryOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 카테고리 수정 뮤테이션 객체
 */
export function useAdminUpdateCategory(ctgryNo: number, options: UseAdminUpdateCategoryOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePatch<SelectCategoryType, UpdateCategoryType>({
    url: [
      'admin', 'categories', ctgryNo,
    ],
    key: adminCategoriesKeys.updateCategory(ctgryNo),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 카테고리 수정 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: adminCategoriesKeys.categoryByNo(ctgryNo).queryKey,
      });
      // 관리자 카테고리 목록도 무효화
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
