import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { adminCategorySubscribeKeys } from '@/_entities/admin/category-subscribe/admin-category-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { categorySubscribeKeys } from '@/_entities/subscribe/category-subscribe/category-subscribe.keys';
import { getToastStyle } from '@/_libs';
import type { CreateCategorySubscribeType } from '@/_schemas/category-subscribe.schema';
import type { MultipleResultType, SelectCategorySubscribeMappingType } from '@/_types';

interface UseAdminCreateMultipleCategorySubscribesOptions extends MutationOptionsType<MultipleResultType<SelectCategorySubscribeMappingType>, CreateCategorySubscribeType[]> {}

/**
 * @description 관리자용 다수 카테고리 구독 생성을 위한 커스텀 훅
 * @param {UseAdminCreateMultipleCategorySubscribesOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 다수 카테고리 구독 생성 뮤테이션 객체
 */
export function useAdminCreateMultipleCategorySubscribes(options: UseAdminCreateMultipleCategorySubscribesOptions = {}) {
  const queryClient = useQueryClient();

  const query = usePost<MultipleResultType<SelectCategorySubscribeMappingType>, CreateCategorySubscribeType[]>({
    url: [
      'admin', 'subscribes',
    ],
    key: adminCategorySubscribeKeys.createMultipleCategorySubscribes(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 다수 카테고리 구독 생성 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: categorySubscribeKeys.categorySubscribeList({}).queryKey,
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
