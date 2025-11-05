import { useGet } from '@/_entities/common/hooks';
import type { TagStatusDistributionItemType } from '@/_types';

/**
 * @description 태그 상태별 분포를 조회하는 커스텀 훅
 */
export function useAdminGetTagStatusDistribution() {
  const query = useGet<TagStatusDistributionItemType[]>({
    url: [
      'admin',
      'tags',
      'analyze',
      'status-distribution',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
