import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCategorySubscribeKeys } from '@/_entities/admin/category-subscribe/admin-category-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePut } from '@/_entities/common/hooks/api/use-put';
import { categorySubscribeKeys } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { UpdateCategorySubscribeType, SearchCategorySubscribeType } from '@/_schemas/category-subscribe.schema';
import type { MultipleResultType } from '@/_types/common.types';

interface UseAdminUpdateMultipleCategorySubscribesOptions extends MutationOptionsType<MultipleResultType, UpdateCategorySubscribeType> {}

export function useAdminUpdateMultipleCategorySubscribes(options: UseAdminUpdateMultipleCategorySubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePut<MultipleResultType, UpdateCategorySubscribeType>({
    url: [
      'admin', 'subscribes', 'multiple',
    ],
    key: adminCategorySubscribeKeys.updateMultiple(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 카테고리 구독 수정 성공 시 관련 쿼리 무효화
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
