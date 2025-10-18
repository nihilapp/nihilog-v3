import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoriesWithoutSubscribersItemType } from '@/_types';

interface UseGetCategoriesWithoutSubscribersOptions extends QueryOptionType<CategoriesWithoutSubscribersItemType[]> {}

/**
 * @description 구독자 없는 카테고리 목록을 조회하는 커스텀 훅
 * @param {UseGetCategoriesWithoutSubscribersOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useGetCategoriesWithoutSubscribers(options: UseGetCategoriesWithoutSubscribersOptions = {}) {
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
    ...options,
  });

  return query;
}
