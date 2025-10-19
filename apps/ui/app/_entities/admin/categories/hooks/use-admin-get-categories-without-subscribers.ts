import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoriesWithoutSubscribersItemType } from '@/_types';

interface OptionType extends QueryOptionType<CategoriesWithoutSubscribersItemType[]> {}

/**
 * @description 구독자가 없는 카테고리 목록을 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetCategoriesWithoutSubscribers(options: OptionType) {
  const query = useGet<CategoriesWithoutSubscribersItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'without-subscribers',
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
    ...options,
  });

  return query;
}
