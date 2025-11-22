import type { SelectTagInfoType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 태그명으로 태그를 조회하는 커스텀 훅
 * @param {string} name - 태그명
 * @param {boolean} [enabled=true] - 쿼리 실행 여부
 */
export function useGetTagByName(name: string, enabled: boolean = true) {
  const query = useGet<SelectTagInfoType>({
    url: [
      'tags',
      'name',
      name,
    ],
    enabled,
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
