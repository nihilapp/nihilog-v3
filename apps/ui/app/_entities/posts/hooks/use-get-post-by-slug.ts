import { toast } from 'sonner';

import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectPostType } from '@/_types';

/**
 * @description 포스트 슬러그로 포스트를 조회하는 커스텀 훅
 * @param {string} pstCd - 포스트 슬러그
 */
export function useGetPostBySlug(pstCd: string) {
  const query = useGet<SelectPostType>({
    url: [
      'posts',
      'slug',
      pstCd,
    ],
    enabled: !!pstCd,
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
