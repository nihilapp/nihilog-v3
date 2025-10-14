import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas/post.schema';
import type { ListType, SelectPostListItemType } from '@/_types';

interface UseGetPostsByArchiveOptions extends QueryOptionType<ListType<SelectPostListItemType>> {}

/**
 * @description 년월별 게시글 목록 조회를 위한 커스텀 훅
 * @param {string} date - 날짜 (yyyyMM 형식)
 * @param {UseGetPostsByArchiveOptions} [options] - 쿼리 옵션 (선택사항)
 * @returns 년월별 게시글 목록 조회 쿼리 객체
 */
export function useGetPostsByArchive(date: string, options: UseGetPostsByArchiveOptions = {}) {
  const query = usePost<ListType<SelectPostListItemType>, SearchPostType>({
    url: [
      'posts', 'archive', date,
    ],
    key: postsKeys.listByArchive(date, {} as SearchPostType), // 기본값으로 빈 객체 사용
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
