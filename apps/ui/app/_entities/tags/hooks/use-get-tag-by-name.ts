import { useGet } from '@/_entities/common/hooks';
import type { SelectTagInfoType } from '@/_types';

/**
 * @description 태그명으로 태그를 조회하는 커스텀 훅
 * @param {string} name - 태그명
 */
export function useGetTagByName(name: string) {
  const query = useGet<SelectTagInfoType>({
    url: [
      'tags',
      'name',
      name,
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
