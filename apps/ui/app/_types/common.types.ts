import type { ErrorType, OkType, UserRoleType } from '@nihilog/schemas';
import type React from 'react';

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

export interface Menu {
  icon: React.ReactNode;
  name: string;
  url?: string;
  action?: () => void;
  role?: UserRoleType[];
  children?: Menu[];
}
