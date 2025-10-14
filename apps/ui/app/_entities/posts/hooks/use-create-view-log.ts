import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { SearchPostType } from '@/_schemas/post.schema';
import type { SelectPostViewLogType } from '@/_types';

interface UseCreateViewLogOptions extends MutationOptionsType<SelectPostViewLogType> {
  postNo?: number; // 게시글 번호 (조회수 업데이트용)
}

/**
 * @description 게시글 조회 로그 기록을 위한 커스텀 훅
 * @param {UseCreateViewLogOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 조회 로그 기록 뮤테이션 객체
 */
export function useCreateViewLog(options: UseCreateViewLogOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePost<SelectPostViewLogType, { pstNo: number }>({
    url: [
      'posts', ':pstNo', 'view',
    ],
    key: postsKeys.createViewLog(0), // 동적으로 설정됨
    callback() {
      toast.success('조회 로그가 기록되었습니다.', {
        style: getToastStyle('success'),
      });

      // 특정 게시글의 조회수만 무효화
      if (options.postNo) {
        queryClient.invalidateQueries({
          queryKey: postsKeys.byNo(options.postNo).queryKey,
        });
      }
      else {
        // postNo가 없는 경우에만 전체 무효화 (fallback)
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
