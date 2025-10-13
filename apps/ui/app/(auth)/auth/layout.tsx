import React from 'react';

import { AuthLayout } from '@/(auth)/auth/_layouts/AuthLayout';

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
