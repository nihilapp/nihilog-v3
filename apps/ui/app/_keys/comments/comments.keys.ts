import { useQueryClient } from '@tanstack/react-query';
/**
 * 댓글 관련 뮤테이션 시 공통 캐시 무효화 로직
 * 댓글 생성/수정/삭제 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidateCommentsCache() {
  const queryClient = useQueryClient();

  return () => {
    // 1. comments로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [ 'comments', ],
    });

    // 2. admin/comments로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'comments',
      ],
    });

    // 3. posts로 시작하는 모든 쿼리 무효화 (댓글 수 변경)
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

    // 5. users로 시작하는 모든 쿼리 무효화 (댓글 작성자 정보)
    queryClient.invalidateQueries({
      queryKey: [ 'users', ],
    });

    // 6. admin/users로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'users',
      ],
    });
  };
}
