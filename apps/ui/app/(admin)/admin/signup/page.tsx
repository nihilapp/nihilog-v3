import { setMeta } from '@/_libs/setMeta';

import { AdminSignup } from './_components/AdminSignup';

export const metadata = setMeta({
  title: '관리자 계정 생성',
  url: '/admin/signup',
});

export default function AdminSignupPage() {
  return <AdminSignup />;
}
