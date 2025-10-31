import type {
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

// 응답 타입 정의
export type ResponseType<TData = unknown> = {
  error: boolean;
  code: string;
  message: string;
  data: TData | null;
  responseTime?: string | null;
};

export type ListResponseType<TData = unknown> = ResponseType<{
  list: TData[];
  totalCnt: number;
}>;

export type ListType<TData = unknown> = {
  list: TData[];
  totalCnt: number;
};

export type OkType<TData = unknown> = ResponseType<TData>;
export type ErrorType = ResponseType<null>;

// ========================================================
// API 공통 타입 (백엔드와 동일 구조)
// ========================================================

// 다중 작업 결과 타입
export type MultipleResultType = {
  successCnt: number;
  failCnt: number;
  failNoList: number[];
};

// 리포지토리 응답 타입
export type RepoResponseType<TData = unknown> = {
  success: boolean;
  data?: TData | null;
  error?: {
    code: string;
    message: string;
  };
};

// 공통 옵션 타입
export type OptionType<TData = unknown, TBody = unknown> = {
  url: (string | number)[];
  params?: Record<string, string> | {} | object;
  body?: TBody;
  ttl?: number;
  enabled?: boolean;
  callback?: (response: OkType<TData>) => void;
  errorCallback?: (error: ErrorType) => void;
};

// Common SEO types (identical across apps)
export type OpenGraphType
  = | 'article'
    | 'book'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'profile'
    | 'website'
    | 'video.tv_show'
    | 'video.other'
    | 'video.movie'
    | 'video.episode';

export interface SiteMetadata {
  title: string;
  url: string;
  description?: string;
  author?: string;
  keywords?: string;
  type?: OpenGraphType;
  tags?: string;
  section?: string;
  created?: string;
  updated?: string;
  imageLink?: string;
  imageAlt?: string;
  robots?:
    | 'index, follow'
    | 'noindex, nofollow'
    | 'index, nofollow'
    | 'noindex, follow';
}

// React Query 옵션 타입들
export type QueryOptionType<TData = unknown, TError = AxiosError<ErrorType>> = Omit<
  UseQueryOptions<OkType<TData>, TError, OkType<TData>>,
  'queryKey' | 'queryFn' | 'enabled'
>;

export type MutationOptionsType<
  TData = unknown,
  TVariables = unknown,
  TError = AxiosError<ErrorType>
> = Omit<UseMutationOptions<OkType<TData>, TError, TVariables>, 'mutationFn' | 'enabled'>;

export type InfiniteQueryOptionType<
  TPageData = unknown,
  TPageParam = unknown,
  TError = AxiosError<ErrorType>
> = Omit<
  UseInfiniteQueryOptions<
    OkType<TPageData>,
    TError,
    InfiniteData<OkType<TPageData>, TPageParam>,
    QueryKey,
    TPageParam
  >,
  'queryKey' | 'queryFn' | 'enabled'
>;

// ========================================================
// 요청 타입 (스키마에서 추출)
// ========================================================

// Y/N 플래그 타입
export type YnType = 'Y' | 'N';

// 사용자 역할 타입
export type UserRoleType = 'USER' | 'ADMIN';

// 게시물 상태 타입
export type PostStatusType = 'EMPTY' | 'WRITING' | 'FINISHED';

// 범용 검색 스키마 타입
export type BaseSearchType = {
  strtRow?: number;
  endRow?: number;
  srchType?: string;
  srchKywd?: string;
  page?: number;
};

// 통계 분석 스키마 타입
export type AnalyzeStatType = {
  dateStart: string;
  dateEnd: string;
  period?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  limit?: number;
};
