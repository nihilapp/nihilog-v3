import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePostQuery } from '@/_entities/common/hooks/api/use-post-query';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas/post.schema';
import type { ListType, SelectPostListItemType } from '@/_types';

interface UseGetPostsByArchiveOptions extends QueryOptionType<ListType<SelectPostListItemType>> {
  searchParams?: SearchPostType;
}

/**
 * @description 년월별 포스트 목록 조회를 위한 커스텀 훅
 * @param {string} date - 날짜 (yyyyMM 형식)
 * @param {UseGetPostsByArchiveOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 년월별 포스트 목록 조회 쿼리 객체
 */
export function useGetPostsByArchive(date: string, options: UseGetPostsByArchiveOptions = {}) {
  const { searchParams = {}, ...queryOptions } = options;

  const query = usePostQuery<ListType<SelectPostListItemType>, SearchPostType>({
    url: [
      'posts', 'archive', date,
    ],
    key: postsKeys.listByArchive(date, searchParams),
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
