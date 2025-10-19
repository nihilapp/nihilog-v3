import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagUsageEfficiencyItemType } from '@/_types';

interface UseGetTagUsageEfficiencyOptions extends QueryOptionType<TagUsageEfficiencyItemType[]> {}

/**
 * @description 태그별 사용 효율성을 조회하는 커스텀 훅
 * @param {UseGetTagUsageEfficiencyOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTagUsageEfficiency(options: UseGetTagUsageEfficiencyOptions = {}) {
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
    ...options,
  });

  return query;
}
