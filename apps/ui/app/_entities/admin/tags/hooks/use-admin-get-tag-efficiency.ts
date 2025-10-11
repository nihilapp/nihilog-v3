import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { TagUsageEfficiencyItemType } from '@/_types';

interface UseAdminGetTagEfficiencyOptions extends QueryOptionType<TagUsageEfficiencyItemType[]> {}

/**
 * @description 관리자용 태그 사용 효율성 조회를 위한 커스텀 훅
 * @param {UseAdminGetTagEfficiencyOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 태그 사용 효율성 조회 쿼리 객체
 */
export function useAdminGetTagEfficiency(options: UseAdminGetTagEfficiencyOptions = {}) {
  const query = useGet<TagUsageEfficiencyItemType[]>({
    url: [
      'admin', 'tags', 'analyze', 'efficiency',
    ],
    key: adminTagsKeys.tagEfficiency(),
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
