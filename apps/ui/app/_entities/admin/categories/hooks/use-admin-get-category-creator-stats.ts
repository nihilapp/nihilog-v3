import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CategoryCreatorStatItemType } from '@/_types';

interface OptionType extends QueryOptionType<CategoryCreatorStatItemType[]> {}

/**
 * @description 카테고리 생성자 통계를 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션
 */
export function useAdminGetCategoryCreatorStats(options: OptionType) {
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
    ...options,
  });

  return query;
}
