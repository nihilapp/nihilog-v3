import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectPostType } from '@/_types';

/**
 * @description 포스트 번호로 포스트를 조회하는 커스텀 훅
 * @param {number} pstNo - 포스트 번호
 */
export function useGetPostByNo(pstNo: number) {
  const query = useGet<SelectPostType>({
    url: [
      'posts',
      pstNo.toString(),
    ],
    enabled: !!pstNo,
    callback(_res) {
      //
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
