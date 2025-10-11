import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { tagsKeys } from '@/_entities/tags/tags.keys';
import { getToastStyle } from '@/_libs';
import type { SelectTagInfoType } from '@/_types';

interface UseGetTagByNameOptions extends QueryOptionType<SelectTagInfoType> {}

/**
 * @description 태그명으로 특정 태그 조회를 위한 커스텀 훅
 * @param {string} tagNm - 조회할 태그명
 * @param {UseGetTagByNameOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 태그 조회 쿼리 객체
 */
export function useGetTagByName(tagNm: string, options: UseGetTagByNameOptions = {}) {
  const query = useGet<SelectTagInfoType>({
    url: [
      'tags', 'name', tagNm,
    ],
    key: tagsKeys.byName(tagNm),
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
