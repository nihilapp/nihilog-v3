import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { TopUsedTagItemType } from '@/_types';

interface UseAdminGetTopUsedTagsOptions extends MutationOptionsType<TopUsedTagItemType[], AnalyzeStatType> {}

/**
 * @description 관리자용 인기 태그 TOP N 조회를 위한 커스텀 훅
 * @param {UseAdminGetTopUsedTagsOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 인기 태그 TOP N 뮤테이션 객체
 */
export function useAdminGetTopUsedTags(options: UseAdminGetTopUsedTagsOptions = {}) {
  const query = usePost<TopUsedTagItemType[], AnalyzeStatType>({
    url: [
      'admin', 'tags', 'analyze', 'top-used',
    ],
    key: adminTagsKeys.analyzeTopUsed({} as AnalyzeStatType), // 기본값으로 빈 객체 사용
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
