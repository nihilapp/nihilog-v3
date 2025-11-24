import { useQueryClient } from '@tanstack/react-query';

/**
 * 관리자 관련 뮤테이션 시 공통 캐시 무효화 로직
 * 관리자 프로필 수정 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidateAdminCache() {
  const queryClient = useQueryClient();

  return () => {
    // 1. admin으로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [ 'admin', ],
    });

    // 2. users로 시작하는 모든 쿼리 무효화 (관리자도 사용자이므로)
    queryClient.invalidateQueries({
      queryKey: [ 'users', ],
    });

    // 3. admin/users로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'users',
      ],
    });
  };
}
