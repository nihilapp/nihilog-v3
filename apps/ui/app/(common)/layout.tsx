import React from 'react';

import { CommonContent } from '@/(common)/_layouts/CommonContent';
import { CommonFooter } from '@/(common)/_layouts/CommonFooter';
import { CommonHeader } from '@/(common)/_layouts/CommonHeader';

interface Props {
  children: React.ReactNode;
}

export default function layout({ children, }: Props) {
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
