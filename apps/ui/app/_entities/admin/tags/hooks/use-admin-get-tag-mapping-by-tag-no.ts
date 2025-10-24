import { toast } from 'sonner';

import type { QueryOptionType } from '@/_types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectPostTagMappingType } from '@/_types';

interface OptionType extends QueryOptionType<SelectPostTagMappingType> {}

/**
 * @description 태그 번호로 매핑을 조회하는 커스텀 훅
 * @param {number} pstNo - 포스트 번호
 * @param {number} tagNo - 태그 번호
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTagMappingByTagNo(pstNo: number, tagNo: number, options: OptionType = {}) {
  const query = useGet<SelectPostTagMappingType>({
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
    ...options,
  });

  return query;
}
