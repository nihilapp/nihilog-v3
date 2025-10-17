import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectTagInfoType } from '@/_types';

interface UseGetTagByNameOptions extends QueryOptionType<SelectTagInfoType> {
  name: string;
}

/**
 * @description 태그명으로 태그를 조회하는 커스텀 훅
 * @param {UseGetTagByNameOptions} options - 쿼리 옵션 및 태그명
 */
export function useGetTagByName(options: UseGetTagByNameOptions) {
  const { name, ...queryOptions } = options;

  const query = useGet<SelectTagInfoType>({
    url: [
      'tags',
      'name',
      name,
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
