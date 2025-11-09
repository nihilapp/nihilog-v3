import type React from 'react';

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
  params?: Record<string, string | number | boolean | null | undefined | (string | number)[]>;
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

export type ReactElementProps<
  ComponentOrTag extends keyof React.JSX.IntrinsicElements | React.ComponentType<any> = 'div',
  ExcludedKeys extends keyof React.ComponentProps<ComponentOrTag> = never
> = Omit<React.ComponentProps<ComponentOrTag>, 'className' | ExcludedKeys>;

// ========================================================
// 요청 타입 (스키마에서 re-export)
// ========================================================

// 스키마에서 정의된 타입들을 re-export
export type {
  YnType,
  UserRoleType,
  PostStatusType,
  BaseSearchType,
  AnalyzeStatType
} from '@/_schemas';

import type { UserRoleType } from '@/_schemas';

export interface Menu {
  icon: React.ReactNode;
  name: string;
  url?: string;
  action?: () => void;
  role?: UserRoleType[];
  children?: Menu[];
}
