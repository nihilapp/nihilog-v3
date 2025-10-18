import { useQueryClient } from '@tanstack/react-query';

/**
 * 관리자 카테고리 관련 뮤테이션 시 공통 캐시 무효화 로직
 * 카테고리 생성/수정/삭제 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidateAdminCategoriesCache() {
  const queryClient = useQueryClient();

  return () => {
    // 1. admin/categories로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'categories',
      ],
    });

    // 2. categories로 시작하는 모든 쿼리 무효화 (일반 카테고리 쿼리)
    queryClient.invalidateQueries({
      queryKey: [ 'categories', ],
    });

    // 3. posts로 시작하는 모든 쿼리 무효화 (카테고리 변경 시 포스트 관련)
    queryClient.invalidateQueries({
      queryKey: [ 'posts', ],
    });

    // 4. admin/posts로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'posts',
      ],
    });

    // 5. users/subscribes/categories로 시작하는 모든 쿼리 무효화 (구독 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'users',
        'subscribes',
        'categories',
      ],
    });

    // 6. admin/subscribes로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'subscribes',
      ],
    });
  };
}
