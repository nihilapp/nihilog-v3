import { AdminSignUpForm } from '@/_components/auth/AdminSignUpForm';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '관리자 생성',
  url: '/auth/admin/signup',
});

export default function page() {
  return (
    <AdminSignUpForm />
  );
}
