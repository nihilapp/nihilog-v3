'use client';

import React from 'react';

import { CommonContent } from '@/_layouts/common/CommonContent';
import { CommonFooter } from '@/_layouts/common/CommonFooter';
import { CommonHeader } from '@/_layouts/common/CommonHeader';

export function CommonLayout({ children, }: { children?: React.ReactNode }) {
  return (
    <>
      <CommonHeader />
      <CommonContent>
        {children}
      </CommonContent>
      <CommonFooter />
    </>
  );
}
