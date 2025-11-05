import type { CSSProperties, ReactNode } from 'react';

export type TableColumn<
  TData,
  K extends Extract<keyof TData, string> = Extract<keyof TData, string>
> = {
  key: K;
  label: string;
  render: (
    rowData: TData,
    value: TData[Extract<keyof TData, string>],
    index: number
  ) => ReactNode;
  className?: string[] | string;
  style?: string | CSSProperties;
  thAlign?: 'left' | 'center' | 'right' | 'justify';
  tdAlign?: 'left' | 'center' | 'right' | 'justify';
  width?: string | number;
  minWidth?: string | number;
};

// export type TableColumn<TData> = {
//   key: Extract<keyof TData, string>;
//   label: string;
//   render?: (value: any, row: TData, index: number) => ReactNode;
//   width?: string | number;
//   align?: 'left' | 'center' | 'right';
//   className?: string;
// };

// export type TableProps<TData extends object = object> = {
//   columns: TableColumn<TData>[];
//   prependColumns?: TableColumn<TData>[];
//   appendColumns?: TableColumn<TData>[];
//   data: TData[];
//   totalCnt?: number;
//   emptyMessage?: string;
//   className?: string;
// };
