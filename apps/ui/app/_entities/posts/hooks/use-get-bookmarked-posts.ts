import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas/post.schema';
import type { ListType, SelectPostBookmarkListItemType } from '@/_types';

interface UseGetBookmarkedPostsOptions extends QueryOptionType<ListType<SelectPostBookmarkListItemType>> {}

/**
 * @description 북마크한 게시글 목록 조회를 위한 커스텀 훅
 * @param {UseGetBookmarkedPostsOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 북마크한 게시글 목록 조회 쿼리 객체
 */
export function useGetBookmarkedPosts(options: UseGetBookmarkedPostsOptions = {}) {
  const query = usePost<ListType<SelectPostBookmarkListItemType>, SearchPostType>({
    url: [
      'posts', 'bookmarked',
    ],
    key: postsKeys.bookmarked({} as SearchPostType), // 기본값으로 빈 객체 사용
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return query;
}
