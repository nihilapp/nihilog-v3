import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagUsageEfficiencyItemType } from '@/_types';

/**
 * @description 태그별 사용 효율성을 조회하는 커스텀 훅
 */
export function useAdminGetTagUsageEfficiency() {
  const query = useGet<TagUsageEfficiencyItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'efficiency',
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
