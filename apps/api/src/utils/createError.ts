import { RESPONSE_CODE } from '@/code/response.code';
import type { ErrorType } from '@/endpoints/prisma/types/common.types';
import { timeToString } from '@/utils/timeHelper';

export function createError(
  code: keyof typeof RESPONSE_CODE,
  message: string
) {
  return {
    error: true,
    code: RESPONSE_CODE[code] as string,
    message,
    data: null,
    responseTime: timeToString(),
  } as ErrorType;
}
