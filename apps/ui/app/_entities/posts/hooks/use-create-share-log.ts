import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks/api/use-post';
import { postsKeys } from '@/_entities/posts/posts.keys';
import { getToastStyle } from '@/_libs';
import type { SelectPostShareLogType } from '@/_types';

interface UseCreateShareLogOptions extends MutationOptionsType<SelectPostShareLogType> {
  postNo?: number; // 게시글 번호 (공유수 업데이트용)
}

/**
 * @description 게시글 공유 로그 기록을 위한 커스텀 훅
 * @param {UseCreateShareLogOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 공유 로그 기록 뮤테이션 객체
 */
export function useCreateShareLog(options: UseCreateShareLogOptions = {}) {
  const queryClient = useQueryClient();

  const mutation = usePost<SelectPostShareLogType, any>({
    url: [
      'posts', ':pstNo', 'share',
    ],
    key: postsKeys.createShareLog(0), // 동적으로 설정됨
    callback() {
      toast.success('공유 로그가 기록되었습니다.', {
        style: getToastStyle('success'),
      });

      // 특정 게시글의 공유수만 무효화
      if (options.postNo) {
        queryClient.invalidateQueries({
          queryKey: postsKeys.postByNo(options.postNo).queryKey,
        });
      }
      else {
        // postNo가 없는 경우에만 전체 무효화 (fallback)
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
