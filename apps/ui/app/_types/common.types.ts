import type {
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ResponseType, ListType } from '@/_schemas/response.schema';

export type OkType<TData = unknown> = ResponseType<TData>;
export type ErrorType = ResponseType<null>;

// 기존 타입들 재export
export type { ResponseType, ListType };

// 추가 타입들
export type MultipleResultType<TData = unknown> = {
  list: TData[];
  totalCnt: number;
};

export type RepoResponseType<TData = unknown> = ResponseType<TData>;

// 공통 옵션 타입
export type OptionType<TData = unknown, TBody = unknown> = {
  url: (string | number)[];
  params?: Record<string, string>;
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
