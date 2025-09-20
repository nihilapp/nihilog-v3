'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Button } from '@/(common)/_components/ui/button';
import type { UserInfoType } from '@/_schemas/user.schema';

export const columns: ColumnDef<UserInfoType>[] = [
  {
    accessorKey: 'userId',
    header: 'ID',
  },
  {
    accessorKey: 'userNm',
    header: 'Name',
  },
  {
    accessorKey: 'emlAddr',
    header: 'Email',
  },
  {
    id: 'actions',
    cell: ({ row, }) => {
      const user = row.original;

      return (
        <Button asChild variant='ghost'>
          <Link href={`/users/${user.userNo}`}>View</Link>
        </Button>
      );
    },
  },
];
