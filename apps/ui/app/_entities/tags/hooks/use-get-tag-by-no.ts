import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectTagInfoType } from '@/_types';

interface UseGetTagByNoOptions extends QueryOptionType<SelectTagInfoType> {
  tagNo: number;
}

/**
 * @description 태그 번호로 태그를 조회하는 커스텀 훅
 * @param {UseGetTagByNoOptions} options - 쿼리 옵션 및 태그 번호
 */
export function useGetTagByNo(options: UseGetTagByNoOptions) {
  const { tagNo, ...queryOptions } = options;

  const query = useGet<SelectTagInfoType>({
    url: [
      'tags',
      tagNo.toString(),
    ],
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...queryOptions,
  });

  return query;
}
