import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas/post.schema';
import type { ListType, SelectPostListItemType } from '@/_types';

interface UseGetPostsOptions extends QueryOptionType<ListType<SelectPostListItemType>> {
  searchParams?: SearchPostType;
}

/**
 * @description 포스트 목록 조회를 위한 커스텀 훅 (자동 fetch)
 * @param {UseGetPostsOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 포스트 목록 조회 쿼리 객체
 */
export function useGetPosts(options: UseGetPostsOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<ListType<SelectPostListItemType>, SearchPostType>({
    url: [
      'posts', 'search',
    ],
    key: postsKeys.search(searchParams),
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

/**
 * @description 관리자 대시보드용 포스트 목록 조회 훅 (자동 fetch)
 * @param {UseGetPostsOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 포스트 목록 조회 쿼리 객체
 */
export function useGetPostsForAdmin(options: UseGetPostsOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<ListType<SelectPostListItemType>, SearchPostType>({
    url: [
      'posts', 'search',
    ],
    key: postsKeys.search(searchParams),
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
