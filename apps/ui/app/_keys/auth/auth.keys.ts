import { useQueryClient } from '@tanstack/react-query';

/**
 * 인증 관련 뮤테이션 시 공통 캐시 무효화 로직
 * 인증 관련 작업 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidateAuthCache(isSignOut: boolean = false) {
  const queryClient = useQueryClient();

  if (isSignOut) {
    return () => {
      // 1. auth로 시작하는 모든 쿼리 제거
      queryClient.removeQueries({
        queryKey: [ 'auth', ],
      });

      // 2. users로 시작하는 모든 쿼리 제거 (로그인 후 사용자 정보 갱신)
      queryClient.removeQueries({
        queryKey: [ 'users', ],
      });

      // 3. admin/users로 시작하는 모든 쿼리 제거
      queryClient.removeQueries({
        queryKey: [
          'admin',
          'users',
        ],
      });
    };
  }

  return () => {
    // 1. auth로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [ 'auth', ],
    });

    // 2. users로 시작하는 모든 쿼리 무효화 (로그인 후 사용자 정보 갱신)
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
