import type { CreatePostViewLogSchemaType } from '@nihilog/schemas';
import type { SelectPostViewLogType } from '@nihilog/schemas';

import { usePost } from '@/_entities/common/hooks';

/**
 * @description 포스트 조회 로그를 생성하는 커스텀 훅
 */
export function useCreatePostViewLog() {
  const mutation = usePost<SelectPostViewLogType, CreatePostViewLogSchemaType>({
    url: [
      'posts',
      'view-logs',
    ],
    callback(_res) {},
    errorCallback(_error) {},
  });

  return mutation;
}
