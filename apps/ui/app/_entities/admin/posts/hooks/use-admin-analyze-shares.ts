import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { SharePlatformStatItemType } from '@/_types/post.types';

interface UseAdminAnalyzeSharesOptions extends MutationOptionsType<SharePlatformStatItemType[], AnalyzeStatType> {
  pstNo?: number;
}

export function useAdminAnalyzeShares(options: UseAdminAnalyzeSharesOptions = {}) {
  const { pstNo, ...restOptions } = options;

  const query = usePost<SharePlatformStatItemType[], AnalyzeStatType>({
    url: [
      'admin', 'posts', 'analyze', 'shares',
    ],
    key: adminPostsKeys.analyzeShares(pstNo),
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
    ...restOptions,
  });

  return query;
}
