import { MESSAGE_CODE } from '@/code/message.code';
import { RESPONSE_CODE } from '@/code/response.code';
import type { ErrorType } from '@/endpoints/prisma/types/common.types';
import { timeToString } from '@/utils/timeHelper';

export function createError(
  code: keyof typeof RESPONSE_CODE,
  message: keyof typeof MESSAGE_CODE
) {
  return {
    error: true,
    code: RESPONSE_CODE[code] as string,
    message: MESSAGE_CODE[message] as string,
    data: null,
    responseTime: timeToString(),
  } as ErrorType;
}
