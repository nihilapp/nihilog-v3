import type {
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ResponseType } from '@/_schemas/response.schema';

export type OkType<TData = unknown> = ResponseType<TData>;
export type ErrorType = ResponseType<null>;

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
  UseQueryOptions<OkType<TData>, TError, TData>,
  'queryKey' | 'queryFn'
>;

export type MutationOptionsType<
  TData = unknown,
  TVariables = unknown,
  TError = AxiosError<ErrorType>
> = Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>;

export type InfiniteQueryOptionType<
  TPageData = unknown,
  TPageParam = unknown,
  TError = AxiosError<ErrorType>
> = Omit<
  UseInfiniteQueryOptions<
    OkType<TPageData>,
    TError,
    InfiniteData<TPageData, TPageParam>,
    QueryKey,
    TPageParam
  >,
  'queryKey' | 'queryFn'
>;
