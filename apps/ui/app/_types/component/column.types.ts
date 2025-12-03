import type { CSSProperties, ReactNode } from 'react';

export type ColumnType<
  TData,
  K extends Extract<keyof TData, string> = Extract<keyof TData, string>
>
  = | {
    type: 'table';
    key: K;
    label?: string;
    render: (
      rowData: TData,
      value: TData[K],
      index: number
    ) => ReactNode;
    className?: string[] | string;
    style?: CSSProperties;
    align?: 'left' | 'center' | 'right' | 'justify';
    columnSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    icon?: ReactNode;
  }
  | {
    type: 'custom';
    key: string;
    label?: string;
    render: (
      rowData: TData,
      value: undefined,
      index: number
    ) => ReactNode;
    className?: string[] | string;
    style?: CSSProperties;
    align?: 'left' | 'center' | 'right' | 'justify';
    columnSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    icon?: ReactNode;
  };
