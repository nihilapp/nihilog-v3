import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { UnusedTagItemType } from '@/_types';

interface UseAdminGetUnusedTagsOptions extends QueryOptionType<UnusedTagItemType[]> {}

/**
 * @description 관리자용 미사용 태그 목록 조회를 위한 커스텀 훅
 * @param {UseAdminGetUnusedTagsOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 미사용 태그 목록 조회 쿼리 객체
 */
export function useAdminGetUnusedTags(options: UseAdminGetUnusedTagsOptions = {}) {
  const query = useGet<UnusedTagItemType[]>({
    url: [
      'admin', 'tags', 'analyze', 'unused',
    ],
    key: adminTagsKeys.unusedTags(),
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
