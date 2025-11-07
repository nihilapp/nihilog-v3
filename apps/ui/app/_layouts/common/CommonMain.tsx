'use client';

import { Box } from '@/_components/ui/box';

interface Props {
  children?: React.ReactNode;
}

export function CommonMain({ children, }: Props) {
  return (
    <Box.Panel mode='main' className='overflow-y-auto p-2 md:p-4'>
      {children}
    </Box.Panel>
  );
}
