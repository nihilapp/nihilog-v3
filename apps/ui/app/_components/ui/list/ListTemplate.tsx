'use client';

import { List } from '@/_components/ui/list';
import { cn } from '@/_libs';
import type { ColumnType } from '@/_types/component/column.types';

interface Props {
  columns: ColumnType<any, string>[];
  data: any[];
  emptyMessage?: string;
  rowKey: string;
  selectLabel?: string;
  selectionMode?: 'none' | 'single' | 'multiple';
  selectedItem?: string;
  selectedItems?: Set<string> | string[];
  onSelectionChange?: ((selectedItem: string) => void) | ((selectedItems: Set<string> | string[]) => void);
  showSelectAll?: boolean;
  itemDirection?: 'row' | 'col';
  custom?: {
    container?: string;
    item?: string;
    cell?: string;
    empty?: string;
  };
}

export function ListTemplate({
  columns,
  data,
  emptyMessage,
  rowKey,
  selectLabel,
  selectionMode: selectionMode,
  selectedItem: selectedItem,
  selectedItems: selectedItems,
  onSelectionChange: onSelectionChange,
  showSelectAll: _showSelectAll,
  itemDirection,
  custom,
}: Props) {
  const getRowId = (row: any): string => {
    return String(row[rowKey]);
  };

  const getIsSelected = (rowId: string): boolean => {
    if (selectionMode === 'single') {
      return selectedItem === rowId;
    }
    else if (selectionMode === 'multiple') {
      if (!selectedItems) return false;
      return selectedItems instanceof Set
        ? selectedItems.has(rowId)
        : selectedItems.includes(rowId);
    }
    return false;
  };

  const onSingleSelect = (rowId: string) => {
    if (!onSelectionChange) return;

    const newSelectedItem = selectedItem === rowId
      ? ''
      : rowId;
    (onSelectionChange as (selectedItem: string) => void)(newSelectedItem);
  };

  const onMultipleSelect = (rowId: string) => {
    if (!onSelectionChange) return;

    const currentItems = selectedItems instanceof Set
      ? new Set(selectedItems)
      : new Set(selectedItems || []);

    if (currentItems.has(rowId)) {
      currentItems.delete(rowId);
    }
    else {
      currentItems.add(rowId);
    }

    (onSelectionChange as (selectedItems: Set<string> | string[]) => void)(currentItems);
  };

  return (
    <List.Container className={custom?.container}>
      {
        data.length > 0
          ? (
            <>
              {data.map((row) => (
                <List.Item
                  key={getRowId(row)}
                  direction={itemDirection}
                  className={cn([
                    getIsSelected(getRowId(row)) && 'border-black-900',
                    custom?.item,
                  ])}
                >
                  {selectionMode === 'single' && onSelectionChange && (
                    <List.Cell
                      checkbox
                      align='center'
                      selectLabel={selectLabel}
                      checked={getIsSelected(getRowId(row))}
                      onChange={() => onSingleSelect(getRowId(row))}
                      className={cn([
                        'flex-none shrink-0 w-[40px] min-w-[40px] max-w-[40px]',
                        custom?.cell,
                      ])}
                    />
                  )}
                  {selectionMode === 'multiple' && onSelectionChange && (
                    <List.Cell
                      checkbox
                      align='center'
                      selectLabel={selectLabel}
                      checked={getIsSelected(getRowId(row))}
                      onChange={() => onMultipleSelect(getRowId(row))}
                      className={cn([
                        'flex-none shrink-0 w-[40px] min-w-[40px] max-w-[40px]',
                        custom?.cell,
                      ])}
                    />
                  )}
                  {columns.map((col, colIndex) => (
                    <List.Cell
                      key={col.key}
                      itemName={col.label}
                      itemValue={col.render
                        ? col.render(
                          row,
                          row[col.key],
                          colIndex
                        )
                        : row[col.key]}
                      className={cn([ custom?.cell, ])}
                    />
                  ))}
                </List.Item>
              ))}
            </>
          )
          : (
            <List.Empty
              emptyMessage={emptyMessage}
              className={custom?.empty}
            />
          )
      }
    </List.Container>
  );
}
