import { SignInForm } from '@/_components/auth/SignInForm';
import { setMeta } from '@/_libs';

// interface Props {}

export const metadata = setMeta({
  title: '로그인',
  url: '/auth/signin',
});

export default function SignInPage() {
  return (
    <SignInForm />
  );
}
