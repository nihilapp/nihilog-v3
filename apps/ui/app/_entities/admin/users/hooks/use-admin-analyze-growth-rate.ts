import { toast } from 'sonner';

import { adminUsersKeys } from '@/_entities/admin/users/admin-users.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { AnalyzeStatType } from '@/_schemas/common.schema';
import type { UserGrowthRateItemType } from '@/_types';

interface UseAdminAnalyzeGrowthRateOptions extends MutationOptionsType<UserGrowthRateItemType[], AnalyzeStatType> {}

/**
 * @description 관리자용 사용자 성장률 분석을 위한 커스텀 훅
 * @param {UseAdminAnalyzeGrowthRateOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 사용자 성장률 분석 뮤테이션 객체
 */
export function useAdminAnalyzeGrowthRate(options: UseAdminAnalyzeGrowthRateOptions = {}) {
  const query = usePost<UserGrowthRateItemType[], AnalyzeStatType>({
    url: [
      'admin', 'users', 'analyze', 'growth-rate',
    ],
    key: adminUsersKeys.analyzeGrowthRate({} as AnalyzeStatType),
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
