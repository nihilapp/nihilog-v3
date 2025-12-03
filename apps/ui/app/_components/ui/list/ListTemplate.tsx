'use client';

import { List } from '@/_components/ui/list';
import { cn } from '@/_libs';
import type { ColumnType } from '@/_types/component/column.types';

interface Props {
  columns: ColumnType<any, any>[];
  data: any[];
  emptyMessage?: string;
  rowKey: string;
  selectedItems?: Set<string> | string[];
  onSelectionChange?: (selectedItems: Set<string> | string[]) => void;
  minWidth?: string;
  custom?: {
    container?: string;
  };
}

export function ListTemplate({
  columns,
  data,
  emptyMessage,
  rowKey,
  selectedItems: selectedItems,
  onSelectionChange: onSelectionChange,
  minWidth,
  custom,
}: Props) {
  const getRowId = (row: any): string => {
    return String(row[rowKey]);
  };

  const getIsSelected = (rowId: string): boolean => {
    if (!selectedItems) return false;
    if (selectedItems instanceof Set) {
      return selectedItems.has(rowId);
    }
    return selectedItems.includes(rowId);
  };

  const onSelect = (rowId: string) => {
    if (!onSelectionChange) return;

    let currentItems: Set<string>;
    if (selectedItems instanceof Set) {
      currentItems = new Set(selectedItems);
    }
    else {
      currentItems = new Set(selectedItems || []);
    }

    if (currentItems.has(rowId)) {
      currentItems.delete(rowId);
    }
    else {
      currentItems.add(rowId);
    }

    onSelectionChange(currentItems);
  };

  const hasData = data.length > 0;
  const isEmpty = data.length === 0;

  const renderColumn = (col: ColumnType<any, any>, row: any, colIndex: number) => {
    let columnValue: any;
    if (col.type === 'table') {
      columnValue = row[col.key];
    }
    else {
      columnValue = undefined;
    }

    if (col.render) {
      return col.render(
        row,
        columnValue,
        colIndex
      );
    }
    return (
      <div>
        <span>{columnValue}</span>
      </div>
    );
  };

  return (
    <List.Container className={cn([
      minWidth && 'min-w-full',
      custom?.container,
    ])}
    >
      {hasData && data.map((row) => {
        const rowId = getRowId(row);

        return (
          <List.Item
            key={rowId}
            checked={getIsSelected(rowId)}
            onChange={() => {
              onSelect(rowId);
            }}
          >
            {columns.map((col, colIndex) => (
              <div key={col.key}>
                <span>
                  {col.label}
                </span>
                {renderColumn(
                  col,
                  row,
                  colIndex
                )}
              </div>
            ))}
          </List.Item>
        );
      })}
      {isEmpty && (
        <List.Empty emptyMessage={emptyMessage} />
      )}
    </List.Container>
  );
}
