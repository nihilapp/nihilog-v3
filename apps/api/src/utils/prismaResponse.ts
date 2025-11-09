import { RESPONSE_CODE, MESSAGE } from '@nihilog/code';
import type { RepoResponseType } from '@nihilog/schemas';

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
        code: code
          ? RESPONSE_CODE[code]
          : RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: message || MESSAGE.COMMON.ERROR,
      },
    };
  }

  return {
    success: true,
    data,
  };
}
