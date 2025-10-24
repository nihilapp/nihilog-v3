import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { UnusedTagItemType } from '@/_types';

interface OptionType extends QueryOptionType<UnusedTagItemType[]> {}

/**
 * @description 미사용 태그 목록을 조회하는 커스텀 훅
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetUnusedTags(options: OptionType = {}) {
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
    ...options,
  });

  return query;
}
