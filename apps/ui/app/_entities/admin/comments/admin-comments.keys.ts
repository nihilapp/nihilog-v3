import { useQueryClient } from '@tanstack/react-query';

/**
 * Admin Comments 관련 뮤테이션 시 공통 캐시 무효화 로직
 * Admin Comments 생성/수정/삭제 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidateAdminCommentsCache() {
  const queryClient = useQueryClient();

  return () => {
    // 1. admin/comments로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'comments',
      ],
    });

    // 2. comments로 시작하는 모든 쿼리 무효화 (일반 댓글 관련)
    queryClient.invalidateQueries({
      queryKey: [ 'comments', ],
    });

    // 3. posts로 시작하는 모든 쿼리 무효화 (댓글과 관련된 포스트)
    queryClient.invalidateQueries({
      queryKey: [ 'posts', ],
    });

    // 4. admin/posts로 시작하는 모든 쿼리 무효화 (관리자 포스트 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'posts',
      ],
    });

    // 5. users로 시작하는 모든 쿼리 무효화 (댓글 작성자 관련)
    queryClient.invalidateQueries({
      queryKey: [ 'users', ],
    });

    // 6. admin/users로 시작하는 모든 쿼리 무효화 (관리자 사용자 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'users',
      ],
    });
  };
}
