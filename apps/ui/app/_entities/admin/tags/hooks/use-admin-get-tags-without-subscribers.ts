import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagWithoutSubscribersItemType } from '@/_types';

interface UseGetTagsWithoutSubscribersOptions extends QueryOptionType<TagWithoutSubscribersItemType[]> {}

/**
 * @description 구독자 없는 태그 목록을 조회하는 커스텀 훅
 * @param {UseGetTagsWithoutSubscribersOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTagsWithoutSubscribers(options: UseGetTagsWithoutSubscribersOptions = {}) {
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
    ...options,
  });

  return query;
}
