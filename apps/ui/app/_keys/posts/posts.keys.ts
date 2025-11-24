import { useQueryClient } from '@tanstack/react-query';

/**
 * 포스트 관련 뮤테이션 시 공통 캐시 무효화 로직
 * 포스트 생성/수정/삭제 시 관련된 모든 쿼리를 무효화합니다.
 */
export function useInvalidatePostsCache() {
  const queryClient = useQueryClient();

  return () => {
    // 1. posts로 시작하는 모든 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: [ 'posts', ],
    });

    // 2. admin/posts로 시작하는 모든 쿼리 무효화 (관리자 관련)
    queryClient.invalidateQueries({
      queryKey: [
        'admin',
        'posts',
      ],
    });

    // 3. 관련 엔티티들도 무효화
    queryClient.invalidateQueries({
      queryKey: [ 'categories', ],
    });
    queryClient.invalidateQueries({
      queryKey: [ 'tags', ],
    });
    queryClient.invalidateQueries({
      queryKey: [ 'comments', ],
    });
    queryClient.invalidateQueries({
      queryKey: [ 'users', ],
    });
  };
}

/**
 * 포스트 북마크 관련 캐시 무효화 로직
 */
export function useInvalidatePostsBookmarkCache() {
  const queryClient = useQueryClient();

  return () => {
    // 북마크 관련 쿼리들 무효화
    queryClient.invalidateQueries({
      queryKey: [
        'posts',
        'bookmarked',
      ],
    });
    queryClient.invalidateQueries({
      queryKey: [ 'posts', ],
    });
  };
}
