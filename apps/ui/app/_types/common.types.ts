// 공통 타입 정의

// 기본 응답 타입
export interface ResponseType<T = any> {
  success: boolean;
  message: string;
  data: T;
  code?: string;
}

// 목록 응답 타입
export interface ListType<T = any> {
  list: T[];
  totalCnt: number;
  page: number;
  strtRow: number;
  endRow: number;
}

// 다중 결과 타입
export interface MultipleResultType<T = any> {
  success: boolean;
  data: T[];
  totalCnt: number;
}

// 에러 타입
export interface ErrorType {
  code: string;
  message: string;
  details?: any;
}

// 리포지토리 응답 타입
export interface RepoResponseType<T = any> {
  success: boolean;
  data: T | null;
  error?: {
    code: string;
    message: string;
  };
}
