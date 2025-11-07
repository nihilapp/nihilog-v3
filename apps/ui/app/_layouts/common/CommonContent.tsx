'use client';

import React from 'react';

import { Box } from '@/_components/ui/box';
import { CommonMain } from '@/_layouts/common/CommonMain';
import { CommonSide } from '@/_layouts/common/CommonSide';

interface Props {
  children?: React.ReactNode;
}

export function CommonContent({ children, }: Props) {
  return (
    <Box.Divider layout='flex' className='flex-1 flex-col md:flex-row p-2 md:p-4 gap-2 overflow-y-hidden'>
      <CommonSide />
      <CommonMain>
        {children}
      </CommonMain>
    </Box.Divider>
  );
}
