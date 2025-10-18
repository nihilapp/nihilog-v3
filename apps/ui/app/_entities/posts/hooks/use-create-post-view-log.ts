import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectPostViewLogType } from '@/_types';

interface UseCreatePostViewLogOptions extends MutationOptionsType<SelectPostViewLogType> {
  pstNo: number;
}

/**
 * @description 포스트 조회 로그를 생성하는 커스텀 훅
 * @param {UseCreatePostViewLogOptions} options - 뮤테이션 옵션 및 포스트 번호
 */
export function useCreatePostViewLog(options: UseCreatePostViewLogOptions) {
  const { pstNo, ...mutationOptions } = options;

  const mutation = usePost<SelectPostViewLogType>({
    url: [
      'posts',
      pstNo.toString(),
      'view',
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
    ...mutationOptions,
  });

  return mutation;
}
