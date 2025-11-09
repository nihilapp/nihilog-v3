import { RESPONSE_CODE } from '@nihilog/code';
import type { ErrorType } from '@nihilog/schemas';

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
