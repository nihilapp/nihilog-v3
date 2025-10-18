import { useQueryClient } from '@tanstack/react-query';

/**
 * 태그 구독 관련 뮤테이션 시 공통 캐시 무효화 로직
 * 태그 구독 생성/수정/삭제 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidateTagSubscribeCache() {
  const queryClient = useQueryClient();

  return () => {
    // 1. users/subscribes/tags로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'users',
        'subscribes',
        'tags',
      ],
    });

    // 2. admin/subscribes로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'subscribes',
      ],
    });

    // 3. tags로 시작하는 모든 쿼리 무효화 (구독 상태 변경 시)
    queryClient.invalidateQueries({
      queryKey: [ 'tags', ],
    });

    // 4. admin/tags로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'tags',
      ],
    });
  };
}
