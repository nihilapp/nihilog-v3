import { useQueryClient } from '@tanstack/react-query';

/**
 * 사용자 관련 뮤테이션 시 공통 캐시 무효화 로직
 * 사용자 생성/수정/삭제 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidateUsersCache() {
  const queryClient = useQueryClient();

  return () => {
    // 1. users로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [ 'users', ],
    });

    // 2. admin/users로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'users',
      ],
    });
  };
}

/**
 * 사용자 구독 관련 뮤테이션 시 공통 캐시 무효화 로직
 * 사용자 구독 설정 변경 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidateUserSubscribeCache() {
  const queryClient = useQueryClient();

  return () => {
    // 1. users로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [ 'users', ],
    });

    // 2. admin/subscribes로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'subscribes',
      ],
    });

    // 3. users/subscribes로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'users',
        'subscribes',
      ],
    });
  };
}
