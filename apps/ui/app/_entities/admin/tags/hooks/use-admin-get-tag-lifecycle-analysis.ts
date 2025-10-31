import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagLifecycleItemType } from '@/_types';

/**
 * @description 태그 생명주기 분석을 조회하는 커스텀 훅
 */
export function useAdminGetTagLifecycleAnalysis() {
  const query = useGet<TagLifecycleItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'lifecycle',
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
