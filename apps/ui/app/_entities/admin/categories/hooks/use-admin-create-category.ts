import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { CreateCategoryType } from '@/_schemas/category.schema';
import type { SelectCategoryType } from '@/_types';

interface UseAdminCreateCategoryOptions extends MutationOptionsType<SelectCategoryType, CreateCategoryType> {}

/**
 * @description 관리자용 카테고리 생성을 위한 커스텀 훅
 * @param {UseAdminCreateCategoryOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 카테고리 생성 뮤테이션 객체
 */
export function useAdminCreateCategory(options: UseAdminCreateCategoryOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePost<SelectCategoryType, CreateCategoryType>({
    url: [
      'admin', 'categories',
    ],
    key: adminCategoriesKeys.createCategory(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 카테고리 생성 성공 시 관련 쿼리 무효화
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
