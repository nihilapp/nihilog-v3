import React from 'react';

import { SignUpForm } from '@/(auth)/auth/signup/_components/SignUpForm';
import { setMeta } from '@/_libs';

// interface Props {}

export const metadata = setMeta({
  title: '블로그 구독',
  url: '/auth/signup',
});

export default function page() {
  return (
    <SignUpForm />
  );
}
