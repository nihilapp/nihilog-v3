import { RESPONSE_CODE } from '@/code';
import { MESSAGE } from '@/code/messages';
import type { RepoResponseType } from '@/endpoints/prisma/types/common.types';

export function prismaResponse<TData = unknown>(
  success: boolean,
  data?: TData | null,
  code?: keyof typeof RESPONSE_CODE,
  message?: string
): RepoResponseType<TData> {
  if (!success) {
    return {
      success: false,
      error: {
        code: code || 'INTERNAL_SERVER_ERROR',
        message: message || MESSAGE.COMMON.ERROR,
      },
    };
  }

  return {
    success: true,
    data,
  };
}
