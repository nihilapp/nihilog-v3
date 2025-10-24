import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { TagLifecycleItemType } from '@/_types';

interface OptionType extends QueryOptionType<TagLifecycleItemType[]> {}

/**
 * @description 태그 생명주기 분석을 조회하는 커스텀 훅
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTagLifecycleAnalysis(options: OptionType = {}) {
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
    ...options,
  });

  return query;
}
