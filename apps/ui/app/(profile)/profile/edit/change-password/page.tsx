import { ChangePasswordForm } from '@/(profile)/profile/edit/change-password/_components/ChangePasswordForm';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '비밀번호 변경',
  url: '/profile/edit/change-password',
});

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
