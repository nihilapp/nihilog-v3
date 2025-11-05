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
    <Box.Divider layout='flex' className='flex-1 p-2 gap-2'>
      <CommonSide />
      <CommonMain>
        {children}
      </CommonMain>
    </Box.Divider>
  );
}
