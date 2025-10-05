import { MESSAGE_CODE, RESPONSE_CODE } from '@/code';
import type { RepoResponseType } from '@/endpoints/prisma/types/common.types';

export function prismaResponse<TData = unknown>(
  success: boolean,
  data?: TData | null,
  code?: keyof typeof RESPONSE_CODE,
  message?: keyof typeof MESSAGE_CODE
): RepoResponseType<TData> {
  if (!success) {
    return {
      success: false,
      error: {
        code: code || 'INTERNAL_SERVER_ERROR',
        message: message || 'ERROR',
      },
    };
  }

  return {
    success: true,
    data,
  };
}
