import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCategorySubscribeKeys } from '@/_entities/admin/category-subscribe/admin-category-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { categorySubscribeKeys } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { DeleteCategorySubscribeType, SearchCategorySubscribeType } from '@/_schemas/category-subscribe.schema';
import type { MultipleResultType } from '@/_types/common.types';

interface UseAdminDeleteMultipleCategorySubscribesOptions extends MutationOptionsType<MultipleResultType, DeleteCategorySubscribeType> {}

export function useAdminDeleteMultipleCategorySubscribes(options: UseAdminDeleteMultipleCategorySubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const query = useDelete<MultipleResultType, DeleteCategorySubscribeType>({
    url: [
      'admin', 'subscribes', 'categories', 'multiple',
    ],
    key: adminCategorySubscribeKeys.deleteMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 카테고리 구독 삭제 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: categorySubscribeKeys.search({} as SearchCategorySubscribeType).queryKey,
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
