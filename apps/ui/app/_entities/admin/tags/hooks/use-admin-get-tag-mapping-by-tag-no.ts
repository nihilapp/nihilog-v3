import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectPstTagMpngType } from '@/_types';

/**
 * @description 태그 번호로 매핑을 조회하는 커스텀 훅
 * @param {number} pstNo - 포스트 번호
 * @param {number} tagNo - 태그 번호
 */
export function useAdminGetTagMappingByTagNo(pstNo: number, tagNo: number) {
  const query = useGet<SelectPstTagMpngType>({
    url: [
      'admin',
      'tags',
      'mapping',
      pstNo.toString(),
      tagNo.toString(),
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
  });

  return query;
}
