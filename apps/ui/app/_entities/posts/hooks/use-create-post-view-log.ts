import { toast } from 'sonner';

import type { MutationOptionsType } from '@/_types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { SelectPostViewLogType } from '@/_types';

interface OptionType extends MutationOptionsType<SelectPostViewLogType, { pstNo: number }> {}

/**
 * @description 포스트 조회 로그를 생성하는 커스텀 훅
 * @param {OptionType} [options] - 뮤테이션 옵션 (선택사항)
 */
export function useCreatePostViewLog(options: OptionType = {}) {
  const mutation = usePost<SelectPostViewLogType, { pstNo: number }>({
    url: (variables) => [
      'posts',
      variables.pstNo?.toString() || '0',
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
    ...options,
  });

  return mutation;
}
