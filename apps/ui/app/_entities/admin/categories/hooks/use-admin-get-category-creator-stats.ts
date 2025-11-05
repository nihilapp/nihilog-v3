import { useGet } from '@/_entities/common/hooks';
import type { CategoryCreatorStatItemType } from '@/_types';

/**
 * @description 카테고리 생성자 통계를 조회하는 커스텀 훅
 */
export function useAdminGetCategoryCreatorStats() {
  const query = useGet<CategoryCreatorStatItemType[]>({
    url: [
      'admin',
      'categories',
      'analyze',
      'creator-stats',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return query;
}
