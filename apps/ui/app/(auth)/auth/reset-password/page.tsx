import { Suspense } from 'react';

import { Loading } from '@/(common)/_components';
import { setMeta } from '@/_libs';

import { ResetPasswordForm } from './_components/ResetPasswordForm';

export const metadata = setMeta({
  title: '새 비밀번호 설정',
  url: '/auth/reset-password',
});

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading text='로딩 중...' />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
