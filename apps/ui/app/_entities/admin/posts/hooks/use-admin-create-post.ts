import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { adminPostsKeys } from '@/_entities/admin/posts/admin-posts.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { getToastStyle } from '@/_libs';
import type { CreatePostType, SearchPostType } from '@/_schemas/post.schema';
import type { SelectPostType } from '@/_types';

interface UseAdminCreatePostOptions extends MutationOptionsType<SelectPostType, CreatePostType> {}

/**
 * @description 관리자용 게시글 생성을 위한 커스텀 훅
 * @param {UseAdminCreatePostOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 게시글 생성 뮤테이션 객체
 */
export function useAdminCreatePost(options: UseAdminCreatePostOptions = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = usePost<SelectPostType, CreatePostType>({
    url: [
      'admin', 'posts',
    ],
    key: adminPostsKeys.create(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 게시글 생성 성공 시 관련 쿼리 무효화
      // 관리자 게시글 목록만 무효화 (전체 캐시 무효화 불필요)
      queryClient.invalidateQueries({
        queryKey: adminPostsKeys.search({} as SearchPostType).queryKey,
      });
      // 생성된 포스트의 코드를 쿼리스트링으로 전달하여 편집 페이지로 이동
      router.push(`/admin/dashboard/posts/new/edit?slug=${res.data?.postCd}`);
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
