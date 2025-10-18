import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { CreatePostShareLogType } from '@/_schemas';
import type { SelectPostShareLogType } from '@/_types';

interface UseCreatePostShareLogOptions extends MutationOptionsType<SelectPostShareLogType, CreatePostShareLogType> {
  pstNo: number;
  body: CreatePostShareLogType;
}

/**
 * @description 포스트 공유 로그를 생성하는 커스텀 훅
 * @param {UseCreatePostShareLogOptions} options - 뮤테이션 옵션, 포스트 번호 및 Body 데이터
 */
export function useCreatePostShareLog(options: UseCreatePostShareLogOptions) {
  const { pstNo, body, ...mutationOptions } = options;

  const mutation = usePost<SelectPostShareLogType, CreatePostShareLogType>({
    url: [
      'posts',
      pstNo.toString(),
      'share',
    ],
    body,
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
    ...mutationOptions,
  });

  return mutation;
}
