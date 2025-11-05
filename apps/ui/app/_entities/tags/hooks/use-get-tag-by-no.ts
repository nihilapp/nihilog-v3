import { useGet } from '@/_entities/common/hooks';
import type { SelectTagInfoType } from '@/_types';

/**
 * @description 태그 번호로 태그를 조회하는 커스텀 훅
 * @param {number} tagNo - 태그 번호
 */
export function useGetTagByNo(tagNo: number) {
  const query = useGet<SelectTagInfoType>({
    url: [
      'tags',
      tagNo.toString(),
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
