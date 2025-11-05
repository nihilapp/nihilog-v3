import type { ReactNode } from 'react';

import type { TableColumn } from '@/_types';

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
      style?: string | React.CSSProperties;
      align?: 'left' | 'center' | 'right' | 'justify';
    }
  ): TableColumn<TData, K> => {
    return {
      ...column,
      key: column.key as K,
    } satisfies TableColumn<TData, K>;
  };
}
