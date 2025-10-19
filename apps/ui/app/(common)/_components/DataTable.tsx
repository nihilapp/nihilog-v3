'use client';

import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/(common)/_components/ui/table';
import { cn } from '@/_libs';
import { CommonHelper } from '@/_libs/tools';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  columns: ColumnDef<any>[];
  data: any[];
  totalCnt: number;
  message?: string;
}

const cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function DataTable({ className, columns, data, totalCnt, message, ...props }: Props) {
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    pageCount: Math.ceil(totalCnt / 10),
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={CommonHelper.uuid(headerGroup.id)}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={CommonHelper.uuid(header.id)}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows
            ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={CommonHelper.uuid(row.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={CommonHelper.uuid(cell.id)}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              )))
            : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  {message}
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>

    </div>
  );
}
