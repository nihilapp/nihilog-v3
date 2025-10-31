import { toast } from 'sonner';

import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreatePostViewLogSchemaType } from '@/_schemas';
import type { SelectPostViewLogType } from '@/_types';

/**
 * @description 포스트 조회 로그를 생성하는 커스텀 훅
 */
export function useCreatePostViewLog() {
  const mutation = usePost<SelectPostViewLogType, CreatePostViewLogSchemaType>({
    url: [
      'posts',
      'view-logs',
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
  });

  return mutation;
}
