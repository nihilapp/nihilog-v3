import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas/post.schema';
import type { ListType, SelectPostBookmarkListItemType } from '@/_types';

interface UseGetBookmarkedPostsOptions extends QueryOptionType<ListType<SelectPostBookmarkListItemType>> {
  searchParams?: SearchPostType;
}

/**
 * @description 북마크한 포스트 목록 조회를 위한 커스텀 훅
 * @param {UseGetBookmarkedPostsOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 북마크한 포스트 목록 조회 쿼리 객체
 */
export function useGetBookmarkedPosts(options: UseGetBookmarkedPostsOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<ListType<SelectPostBookmarkListItemType>, SearchPostType>({
    url: [
      'posts', 'bookmarked',
    ],
    key: postsKeys.bookmarked(searchParams),
    body: searchParams,
    callback() {
      // 성공 시 토스트 메시지는 필요에 따라 추가
    },
    errorCallback(error) {
      toast.error(error.message, {
        style: getToastStyle('error'),
      });
    },
    options: queryOptions,
  });

  return query;
}
