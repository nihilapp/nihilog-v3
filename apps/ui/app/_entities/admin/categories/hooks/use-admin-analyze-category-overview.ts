import { toast } from 'sonner';

import { adminCategoriesKeys } from '@/_entities/admin/categories/admin-categories.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { AnalyzeCategoryStatItemType } from '@/_types';

interface UseAdminAnalyzeCategoryOverviewOptions extends MutationOptionsType<AnalyzeCategoryStatItemType[], AnalyzeStatType> {
  ctgryNo?: number;
}

/**
 * @description 관리자용 카테고리 분석 통계를 위한 커스텀 훅
 * @param {UseAdminAnalyzeCategoryOverviewOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 카테고리 분석 통계 뮤테이션 객체
 */
export function useAdminAnalyzeCategoryOverview(options: UseAdminAnalyzeCategoryOverviewOptions = {}) {
  const { ctgryNo, ...restOptions } = options;

  const query = usePost<AnalyzeCategoryStatItemType[], AnalyzeStatType>({
    url: [
      'admin', 'categories', 'analyze', 'overview',
    ],
    key: adminCategoriesKeys.analyzeOverview({} as AnalyzeStatType),
    params: ctgryNo
      ? { ctgryNo, }
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
