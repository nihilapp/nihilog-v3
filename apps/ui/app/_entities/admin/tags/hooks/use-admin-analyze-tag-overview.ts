import { toast } from 'sonner';

import { adminTagsKeys } from '@/_entities/admin/tags/admin-tags.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { AnalyzeTagStatItemType } from '@/_types';

interface UseAdminAnalyzeTagOverviewOptions extends MutationOptionsType<AnalyzeTagStatItemType, AnalyzeStatType> {}

/**
 * @description 관리자용 태그 분석 통계 (9개 지표 통합)를 위한 커스텀 훅
 * @param {UseAdminAnalyzeTagOverviewOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 태그 분석 통계 뮤테이션 객체
 */
export function useAdminAnalyzeTagOverview(options: UseAdminAnalyzeTagOverviewOptions = {}) {
  const query = usePost<AnalyzeTagStatItemType, AnalyzeStatType>({
    url: [
      'admin', 'tags', 'analyze', 'overview',
    ],
    key: adminTagsKeys.analyzeOverview({} as AnalyzeStatType), // 기본값으로 빈 객체 사용
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
