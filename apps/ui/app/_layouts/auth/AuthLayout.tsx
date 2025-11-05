'use client';

import React from 'react';

import { AuthContent } from '@/_layouts/auth/AuthContent';
import { AuthFooter } from '@/_layouts/auth/AuthFooter';
import { AuthHeader } from '@/_layouts/auth/AuthHeader';

interface Props {
  children: React.ReactNode;
}

export function AuthLayout({ children, }: Props) {
  return (
    <>
      <AuthHeader />
      <AuthContent>
        {children}
      </AuthContent>
      <AuthFooter />
    </>
  );
}
