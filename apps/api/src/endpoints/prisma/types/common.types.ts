import type { MESSAGE_CODE, RESPONSE_CODE } from '@/code';

// 리스트 형식의 데이터 타입
export type ListType<TData = unknown> = {
  list: TData[];
  totalCnt: number;
};

// 다중 작업 결과 타입
export type MultipleResultType = {
  successCnt: number;
  failCnt: number;
  failNoList: number[];
};

// 응답 타입
export type ResponseType<TData = unknown> = {
  error: false;
  code: keyof typeof RESPONSE_CODE;
  message: keyof typeof MESSAGE_CODE;
  data: TData;
};

// 에러 타입
export type ErrorType = {
  error: true;
  code: keyof typeof RESPONSE_CODE;
  message: keyof typeof MESSAGE_CODE;
  data: null;
};

// 리포지토리 응답 타입
export type RepoResponseType<TData = unknown> = {
  success: boolean;
  data?: TData | null;
  error?: {
    code: keyof typeof RESPONSE_CODE;
    message: keyof typeof MESSAGE_CODE;
  };
};
