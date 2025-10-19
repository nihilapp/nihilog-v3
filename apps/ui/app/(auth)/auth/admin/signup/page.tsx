import React from 'react';

import { AdminSignUpForm } from '@/(auth)/auth/admin/signup/_components/AdminSignUpForm';
import { setMeta } from '@/_libs';

// interface Props {}

export const metadata = setMeta({
  title: '관리자 계정 생성',
  url: '/auth/admin/signup',
});

export default function page() {
  return (
    <AdminSignUpForm />
  );
}
