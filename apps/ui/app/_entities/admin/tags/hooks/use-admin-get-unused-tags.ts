import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UnusedTagItemType } from '@/_types';

/**
 * @description 미사용 태그 목록을 조회하는 커스텀 훅
 */
export function useAdminGetUnusedTags() {
  const query = useGet<UnusedTagItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'unused',
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
