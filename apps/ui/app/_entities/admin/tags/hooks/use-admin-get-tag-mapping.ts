import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { SelectPostTagMappingType } from '@/_types';

interface UseAdminGetTagMappingOptions extends QueryOptionType<SelectPostTagMappingType> {}

/**
 * @description 관리자용 태그 매핑 조회를 위한 커스텀 훅
 * @param {number} pstNo - 게시글 번호
 * @param {number} tagNo - 태그 번호
 * @param {UseAdminGetTagMappingOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 태그 매핑 조회 쿼리 객체
 */
export function useAdminGetTagMapping(pstNo: number, tagNo: number, options: UseAdminGetTagMappingOptions = {}) {
  const query = useGet<SelectPostTagMappingType>({
    url: [
      'admin', 'tags', 'mapping', pstNo, tagNo,
    ],
    key: adminTagsKeys.tagMapping(pstNo, tagNo),
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
