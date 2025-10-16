import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { AnalyzePostItemType } from '@/_types';

interface UseAdminAnalyzePostOverviewOptions extends QueryOptionType<AnalyzePostItemType> {
  pstNo?: number;
  searchParams?: AnalyzeStatType;
}

/**
 * @description 관리자용 포스트 분석 통계를 위한 커스텀 훅
 * @param {UseAdminAnalyzePostOverviewOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 포스트 분석 통계 쿼리 객체
 */
export function useAdminAnalyzePostOverview(options: UseAdminAnalyzePostOverviewOptions = {}) {
  const { pstNo, searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<AnalyzePostItemType, AnalyzeStatType>({
    url: [
      'admin', 'posts', 'analyze', 'overview',
    ],
    key: adminPostsKeys.analyzeOverview(searchParams),
    body: searchParams,
    params: pstNo
      ? { pstNo, }
      : undefined,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    options: queryOptions,
  });

  return query;
}
