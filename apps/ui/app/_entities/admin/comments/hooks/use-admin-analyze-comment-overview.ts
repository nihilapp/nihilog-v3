import { toast } from 'sonner';

import { adminCommentsKeys } from '@/_entities/admin/comments/admin-comments.keys';
import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { AnalyzeCommentStatItemType } from '@/_types';

interface UseAdminAnalyzeCommentOverviewOptions extends QueryOptionType<AnalyzeCommentStatItemType> {
  pstNo?: number;
  searchParams?: AnalyzeStatType;
}

/**
 * @description 관리자용 댓글 분석 통계를 위한 커스텀 훅
 * @param {UseAdminAnalyzeCommentOverviewOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 댓글 분석 통계 쿼리 객체
 */
export function useAdminAnalyzeCommentOverview(options: UseAdminAnalyzeCommentOverviewOptions = {}) {
  const { pstNo, searchParams, ...queryOptions } = options;

  const query = usePostQuery<AnalyzeCommentStatItemType, AnalyzeStatType | undefined>({
    url: [
      'admin', 'comments', 'analyze', 'overview',
    ],
    key: adminCommentsKeys.analyzeOverview(searchParams as AnalyzeStatType),
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
