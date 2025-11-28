'use client';

import { MdCheckBox } from 'react-icons/md';

import { List } from '@/_components/ui/list';
import { cn } from '@/_libs';
import type { ColumnType } from '@/_types/component/column.types';

interface Props {
  columns: ColumnType<any, any>[];
  data: any[];
  emptyMessage?: string;
  rowKey: string;
  selectLabel?: string;
  selectionMode?: 'none' | 'single' | 'multiple';
  selectedItem?: string;
  selectedItems?: Set<string> | string[];
  onSelectionChange?: ((selectedItem: string) => void) | ((selectedItems: Set<string> | string[]) => void);
  showSelectAll?: boolean;
  showSelectIcon?: boolean;
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
  showSelectIcon = false,
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
                  {selectionMode === 'single' && onSelectionChange && (() => {
                    const rowId = getRowId(row);
                    const onCellChange = () => {
                      onSingleSelect(rowId);
                    };

                    return (
                      <List.Cell
                        checkbox
                        align='center'
                        selectLabel={selectLabel}
                        icon={showSelectIcon
                          ? <MdCheckBox />
                          : undefined}
                        checked={getIsSelected(rowId)}
                        onChange={onCellChange}
                        className={cn([
                          'flex-none shrink-0 w-[40px] min-w-[40px] max-w-[40px]',
                          custom?.cell,
                        ])}
                      />
                    );
                  })()}
                  {selectionMode === 'multiple' && onSelectionChange && (() => {
                    const rowId = getRowId(row);
                    const onCellChange = () => {
                      onMultipleSelect(rowId);
                    };

                    return (
                      <List.Cell
                        checkbox
                        align='center'
                        selectLabel={selectLabel}
                        icon={showSelectIcon
                          ? <MdCheckBox />
                          : undefined}
                        checked={getIsSelected(rowId)}
                        onChange={onCellChange}
                        className={cn([
                          'flex-none shrink-0',
                          custom?.cell,
                        ])}
                      />
                    );
                  })()}
                  {columns.map((col, colIndex) => {
                    const colClassName = Array.isArray(col.className)
                      ? col.className.join(' ')
                      : col.className || '';
                    const hasWidthClass = /\bw-\[|w-\d+|w-full|w-auto|w-screen|w-min|w-max|w-fit\b/.test(colClassName);
                    const shouldAddFlexNone = hasWidthClass && !/\bflex-none\b/.test(colClassName);
                    const columnValue = col.type === 'table'
                      ? row[col.key]
                      : undefined;

                    return (
                      <List.Cell
                        key={col.key}
                        itemName={col.label}
                        itemValue={col.render
                          ? col.render(
                            row,
                            columnValue,
                            colIndex
                          )
                          : columnValue}
                        align={col.align}
                        columnSize={
                          hasWidthClass
                            ? undefined
                            : col.columnSize
                        }
                        icon={col.icon}
                        className={cn([
                          col.className,
                          shouldAddFlexNone && 'flex-none',
                          custom?.cell,
                        ])}
                      />
                    );
                  })}
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
