import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { useDelete } from '@/_entities/common/hooks/api/use-delete';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';

interface UseDeleteBookmarkOptions extends MutationOptionsType<boolean> {
  postNo?: number; // 게시글 번호 (북마크 상태 및 목록 무효화용)
}

/**
 * @description 게시글 북마크 삭제를 위한 커스텀 훅
 * @param {UseDeleteBookmarkOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 북마크 삭제 뮤테이션 객체
 */
export function useDeleteBookmark(options: UseDeleteBookmarkOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = useDelete<boolean, any>({
    url: [
      'posts', ':pstNo', 'bookmark',
    ],
    key: postsKeys.deleteBookmark(0), // 동적으로 설정됨
    callback() {
      toast.success('북마크가 제거되었습니다.', {
        style: getToastStyle('success'),
      });

      // 특정 게시글의 북마크 상태 무효화
      if (options.postNo) {
        queryClient.invalidateQueries({
          queryKey: postsKeys.postByNo(options.postNo).queryKey,
        });
      }

      // 사용자의 북마크 목록 무효화 (기본 파라미터 사용)
      queryClient.invalidateQueries({
        queryKey: postsKeys.bookmarkedPosts({}).queryKey,
      });

      // postNo가 없는 경우에만 전체 무효화 (fallback)
      if (!options.postNo) {
        queryClient.invalidateQueries({
          queryKey: postsKeys.all().queryKey,
        });
      }
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return mutation;
}
