import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks/api/use-get';
import { getToastStyle } from '@/_libs';
import type { TagCleanupRecommendationItemType } from '@/_types';

interface UseAdminGetTagCleanupRecommendationsOptions extends QueryOptionType<TagCleanupRecommendationItemType[]> {}

/**
 * @description 관리자용 태그 정리 추천 조회를 위한 커스텀 훅
 * @param {UseAdminGetTagCleanupRecommendationsOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 태그 정리 추천 조회 쿼리 객체
 */
export function useAdminGetTagCleanupRecommendations(options: UseAdminGetTagCleanupRecommendationsOptions = {}) {
  const query = useGet<TagCleanupRecommendationItemType[]>({
    url: [
      'admin', 'tags', 'analyze', 'cleanup',
    ],
    key: adminTagsKeys.tagCleanupRecommendations(),
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
