import type { ReactNode } from 'react';

import type { ColumnType } from '@/_types';

export function defineColumns<TData>() {
  return <K extends Extract<keyof TData, string>>(
    column: {
      key: K | K & string;
      label: string;
      render: (
        rowData: TData,
        value: TData[Extract<keyof TData, string>],
        index: number
      ) => ReactNode;
      className?: string[] | string;
      style?: React.CSSProperties;
      align?: 'left' | 'center' | 'right' | 'justify';
    }
  ): ColumnType<TData, K> => {
    return {
      ...column,
      key: column.key as K,
    } satisfies ColumnType<TData, K>;
  };
}
