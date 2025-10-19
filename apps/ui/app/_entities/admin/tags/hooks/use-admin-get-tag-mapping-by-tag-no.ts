import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectPostTagMappingType } from '@/_types';

interface UseGetTagMappingByTagNoOptions extends QueryOptionType<SelectPostTagMappingType> {
  pstNo: number;
  tagNo: number;
}

/**
 * @description 태그 번호로 매핑을 조회하는 커스텀 훅
 * @param {UseGetTagMappingByTagNoOptions} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetTagMappingByTagNo(options: UseGetTagMappingByTagNoOptions = {
  pstNo: 0,
  tagNo: 0,
}) {
  const { pstNo, tagNo, ...queryOptions } = options;

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
    ...queryOptions,
  });

  return query;
}
