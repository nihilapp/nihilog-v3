import { toast } from 'sonner';

import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreatePostShareLogSchemaType } from '@/_schemas';
import type { SelectPostShareLogType } from '@/_types';

/**
 * @description 포스트 공유 로그를 생성하는 커스텀 훅
 */
export function useCreatePostShareLog() {
  const mutation = usePost<SelectPostShareLogType, CreatePostShareLogSchemaType>({
    url: [
      'posts',
      'share-logs',
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
