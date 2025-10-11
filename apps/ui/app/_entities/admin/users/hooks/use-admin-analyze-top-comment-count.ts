import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { TopUsersByCommentCountItemType } from '@/_types';

interface UseAdminAnalyzeTopCommentCountOptions extends MutationOptionsType<TopUsersByCommentCountItemType[], AnalyzeStatType> {}

/**
 * @description 관리자용 사용자별 댓글 작성 수 TOP N 분석을 위한 커스텀 훅
 * @param {UseAdminAnalyzeTopCommentCountOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 사용자별 댓글 작성 수 TOP N 분석 뮤테이션 객체
 */
export function useAdminAnalyzeTopCommentCount(options: UseAdminAnalyzeTopCommentCountOptions = {}) {
  const query = usePost<TopUsersByCommentCountItemType[], AnalyzeStatType>({
    url: [
      'admin', 'users', 'analyze', 'top-comment-count',
    ],
    key: adminUsersKeys.analyzeTopCommentCount({} as AnalyzeStatType),
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
