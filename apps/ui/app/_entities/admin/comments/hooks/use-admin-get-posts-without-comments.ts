import { toast } from 'sonner';

import type { QueryOptionType } from '@/_entities/common/common.types';
import { useGet } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { PostsWithoutCommentsItemType } from '@/_types';

interface OptionType extends QueryOptionType<PostsWithoutCommentsItemType[]> {}

/**
 * @description 댓글 없는 포스트 목록을 조회하는 커스텀 훅
 * @param {OptionType} [options] - 쿼리 옵션 (선택사항)
 */
export function useAdminGetPostsWithoutComments(options: OptionType = {}) {
  const query = useGet<PostsWithoutCommentsItemType[]>({
    url: [
      'admin',
      'comments',
      'analyze',
      'posts-without-comments',
    ],
    callback(res) {
      toast.success(
        res.message,
        {
          style: getToastStyle('success'),
        }
      );
    },
    errorCallback(error) {
      toast.error(
        error.message,
        {
          style: getToastStyle('error'),
        }
      );
    },
    ...options,
  });

  return query;
}
