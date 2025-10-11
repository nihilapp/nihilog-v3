import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { getToastStyle } from '@/_libs';

interface UseAdminDeleteCategoryOptions extends MutationOptionsType<boolean> {}

/**
 * @description 관리자용 카테고리 삭제를 위한 커스텀 훅
 * @param {number} ctgryNo - 삭제할 카테고리 번호
 * @param {UseAdminDeleteCategoryOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 카테고리 삭제 뮤테이션 객체
 */
export function useAdminDeleteCategory(ctgryNo: number, options: UseAdminDeleteCategoryOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<boolean>({
    url: [
      'admin', 'categories', ctgryNo,
    ],
    key: adminCategoriesKeys.deleteCategory(ctgryNo),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 카테고리 삭제 성공 시 관련 쿼리 무효화
      // 관리자 카테고리 목록만 무효화 (전체 캐시 무효화 불필요)
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
