import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas/post.schema';
import type { SelectPostBookmarkType } from '@/_types';

interface UseCreateBookmarkOptions extends MutationOptionsType<SelectPostBookmarkType> {
  postNo?: number; // 게시글 번호 (북마크 상태 및 목록 무효화용)
}

/**
 * @description 게시글 북마크 생성을 위한 커스텀 훅
 * @param {UseCreateBookmarkOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 북마크 생성 뮤테이션 객체
 */
export function useCreateBookmark(options: UseCreateBookmarkOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePost<SelectPostBookmarkType, any>({
    url: [
      'posts', ':pstNo', 'bookmark',
    ],
    key: postsKeys.createBookmark(0), // 동적으로 설정됨
    callback() {
      toast.success('북마크가 추가되었습니다.', {
        style: getToastStyle('success'),
      });

      // 특정 게시글의 북마크 상태 무효화
      if (options.postNo) {
        queryClient.invalidateQueries({
          queryKey: postsKeys.byNo(options.postNo).queryKey,
        });
      }

      // 사용자의 북마크 목록 무효화 (기본 파라미터 사용)
      queryClient.invalidateQueries({
        queryKey: postsKeys.bookmarked({} as SearchPostType).queryKey,
      });

      // postNo가 없는 경우에만 전체 무효화 (fallback)
      if (!options.postNo) {
        queryClient.invalidateQueries({
          queryKey: postsKeys.search({} as SearchPostType).queryKey,
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
