import React from 'react';

import { SignInForm } from '@/(auth)/auth/signin/_components/SignInForm';
import { setMeta } from '@/_libs';

interface Props {}

export const metadata = setMeta({
  title: '로그인',
  url: '/auth/signin',
});

export default function page() {
  return (
    <SignInForm />
  );
}
