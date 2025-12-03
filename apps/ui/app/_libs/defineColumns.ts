import type { ReactNode } from 'react';

import type { ColumnType } from '@/_types';

export function defineColumns<TData>() {
  const tableColumn = <K extends Extract<keyof TData, string>>(
    column: {
      key: K;
      label?: string;
      render: (
        rowData: TData,
        value: TData[K],
        index: number
      ) => ReactNode;
      className?: string[] | string;
      style?: React.CSSProperties;
      align?: 'left' | 'center' | 'right' | 'justify';
      icon?: ReactNode;
    }
  ): ColumnType<TData, K> => {
    return {
      ...column,
      type: 'table',
      key: column.key,
    } satisfies ColumnType<TData, K>;
  };

  const customColumn = (column: {
    key: string;
    label?: string;
    render: (
      rowData: TData,
      value: undefined,
      index: number
    ) => ReactNode;
    className?: string[] | string;
    style?: React.CSSProperties;
    align?: 'left' | 'center' | 'right' | 'justify';
    icon?: ReactNode;
  }): ColumnType<TData, Extract<keyof TData, string>> => {
    return {
      ...column,
      type: 'custom',
    } as ColumnType<TData, Extract<keyof TData, string>>;
  };

  return {
    tableColumn,
    customColumn,
  };
}
