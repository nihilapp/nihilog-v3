import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagWithoutSubscribersItemType } from '@/_types';

/**
 * @description 구독자 없는 태그 목록을 조회하는 커스텀 훅
 */
export function useAdminGetTagsWithoutSubscribers() {
  const query = useGet<TagWithoutSubscribersItemType[]>({
    url: [
      'admin',
      'tags',
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
