import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectTagInfoType } from '@/_types';

interface OptionType extends QueryOptionType<SelectTagInfoType> {
  tagNo: number;
}

/**
 * @description 태그 번호로 태그를 조회하는 커스텀 훅
 * @param {OptionType} options - 쿼리 옵션 및 태그 번호
 */
export function useGetTagByNo(options: OptionType) {
  const { tagNo, ...queryOptions } = options;

  const query = useGet<SelectTagInfoType>({
    url: [
      'tags',
      tagNo.toString(),
    ],
    enabled: !!tagNo,
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
    ...queryOptions,
  });

  return query;
}
