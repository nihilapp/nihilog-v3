import { toast } from 'sonner';

import { adminSubscribeKeys } from '@/_entities/admin/subscribe/admin-subscribe.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { AnalyzeSubscribeStatItemType } from '@/_types';

interface UseAdminAnalyzeSubscribeOverviewOptions extends MutationOptionsType<AnalyzeSubscribeStatItemType, AnalyzeStatType> {}

/**
 * @description 관리자용 구독 분석 통계를 위한 커스텀 훅
 * @param {UseAdminAnalyzeSubscribeOverviewOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 구독 분석 통계 뮤테이션 객체
 */
export function useAdminAnalyzeSubscribeOverview(options: UseAdminAnalyzeSubscribeOverviewOptions = {}) {
  const query = usePost<AnalyzeSubscribeStatItemType, AnalyzeStatType>({
    url: [
      'admin', 'subscribe', 'analyze', 'overview',
    ],
    key: adminSubscribeKeys.analyzeOverview({} as AnalyzeStatType),
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
