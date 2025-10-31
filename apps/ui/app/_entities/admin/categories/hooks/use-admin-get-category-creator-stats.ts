import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoryCreatorStatItemType } from '@/_types';

/**
 * @description 카테고리 생성자 통계를 조회하는 커스텀 훅
 */
export function useAdminGetCategoryCreatorStats() {
  const query = useGet<CategoryCreatorStatItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'creator-stats',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
  });

  return query;
}
