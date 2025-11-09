import type { CommentStatusDistributionItemType } from '@nihilog/schemas';

import { useGet } from '@/_entities/common/hooks';

/**
 * @description 댓글 상태별 분포를 조회하는 커스텀 훅
 */
export function useAdminGetCommentStatusDistribution() {
  const query = useGet<CommentStatusDistributionItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'status-distribution',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
