import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoriesWithoutSubscribersItemType } from '@/_types';

/**
 * @description 구독자가 없는 카테고리 목록을 조회하는 커스텀 훅
 */
export function useAdminGetCategoriesWithoutSubscribers() {
  const query = useGet<CategoriesWithoutSubscribersItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'no-subscribers',
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
