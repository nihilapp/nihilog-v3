'use client';

import type { CSSProperties } from 'react';

import { Box } from '@/_components/ui/box';
import { Table } from '@/_components/ui/table';
import type { TableColumn } from '@/_types';

interface Props {
  columns: TableColumn<any, string>[];
  data: any[];
  emptyMessage?: string;
  rowKey?: string | ((row: any, index: number) => string | number);
}

function parseStyleString(styleString: string): CSSProperties {
  const style: CSSProperties = {};
  const declarations = styleString.split(';').filter(Boolean);

  for (const declaration of declarations) {
    const [
      property,
      value,
    ] = declaration.split(':').map((s) => s.trim());
    if (property && value) {
      const camelProperty = property.replace(
        /-([a-z])/g,
        (_, letter) => letter.toUpperCase()
      );
      style[camelProperty as keyof CSSProperties] = value as never;
    }
  }

  return style;
}

function normalizeStyle(style: string | CSSProperties | undefined): CSSProperties | undefined {
  if (!style) return undefined;
  if (typeof style === 'string') return parseStyleString(style);
  return style;
}

function buildColumnStyle(
  col: TableColumn<any, string>,
  align?: 'left' | 'center' | 'right' | 'justify'
): CSSProperties | undefined {
  const baseStyle = normalizeStyle(col.style);
  const widthStyle: CSSProperties = {};

  if (col.width) {
    widthStyle.width = typeof col.width === 'number'
      ? `${col.width}px`
      : col.width;
  }

  if (col.minWidth) {
    widthStyle.minWidth = typeof col.minWidth === 'number'
      ? `${col.minWidth}px`
      : col.minWidth;
  }

  const alignStyle: CSSProperties = align
    ? { textAlign: align, }
    : {};

  if (baseStyle || Object.keys(widthStyle).length > 0 || Object.keys(alignStyle).length > 0) {
    return {
      ...baseStyle,
      ...widthStyle,
      ...alignStyle,
    };
  }

  return undefined;
}

export function TableTemplate({ columns, data, emptyMessage, rowKey = 'pstNo', }: Props) {
  const getRowKey = (row: any, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(
        row,
        index
      );
    }
    return row[rowKey] ?? index;
  };

  return (
    data.length > 0
      ? (
        <Table.Container>
          <Table.Header>
            <Table.Row>
              {columns.map((col) => {
                const className = Array.isArray(col.className)
                  ? col.className.join(' ')
                  : col.className;
                const style = buildColumnStyle(
                  col,
                  col.thAlign
                );

                return (
                  <Table.Title
                    key={col.key}
                    className={className}
                    style={style}
                  >
                    {col.label}
                  </Table.Title>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row, index) => (
              <Table.Row key={getRowKey(
                row,
                index
              )}
              >
                {columns.map((col, colIndex) => {
                  const className = Array.isArray(col.className)
                    ? col.className.join(' ')
                    : col.className;
                  const style = buildColumnStyle(
                    col,
                    col.tdAlign
                  );

                  return (
                    <Table.Cell
                      key={col.key}
                      className={className}
                      style={style}
                    >
                      {col.render(
                        row,
                        row[col.key],
                        colIndex
                      )}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Container>
      )
      : (
        <Box.Panel>
          <Box.Content>
            {emptyMessage}
          </Box.Content>
        </Box.Panel>
      )
  );
}
