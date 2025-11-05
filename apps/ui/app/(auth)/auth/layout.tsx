import React from 'react';

import { AuthLayout } from '@/_layouts/auth/AuthLayout';

interface Props {
  children: React.ReactNode;
}

export default function layout({ children, }: Props) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}
