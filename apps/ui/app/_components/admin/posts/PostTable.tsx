'use client';

import { Box } from '@/_components/ui/box';
import { Table } from '@/_components/ui/table';
import type { SelectPostListItemType, TableColumn } from '@/_types';

interface Props {
  columns: TableColumn<SelectPostListItemType>[];
  data: SelectPostListItemType[];
  showRowNo?: boolean;
  rowNoLabel?: string;
  emptyMessage?: string;
  totalCnt?: number;
}

export function PostTable({ columns, data, showRowNo = true, rowNoLabel = 'No.', emptyMessage, totalCnt, }: Props) {
  return (
    data.length > 0
      ? (
        <Table.Container>
          <Table.Header>
            <Table.Row>
              {showRowNo && (
                <Table.Title>{rowNoLabel}</Table.Title>
              )}
              {columns.map((col) => (
                <Table.Title key={col.key}>{col.label}</Table.Title>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row) => (
              <Table.Row key={row.pstNo}>
                {showRowNo && (
                  <Table.Cell key='rowNo'>
                    {row.rowNo}
                  </Table.Cell>
                )}
                {columns.map((col, index) => {
                  return (
                    <Table.Cell key={col.key}>
                      {col.render(
                        row,
                        row[col.key] as SelectPostListItemType[Extract<keyof SelectPostListItemType, string>],
                        index
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
