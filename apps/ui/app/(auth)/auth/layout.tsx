import { AuthCard } from '@/(auth)/_layouts/AuthCard';

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children, }: Props) {
  return (
    <main className='flex min-h-screen items-center justify-center bg-muted/40 p-4 overflow-hidden'>
      <AuthCard>
        {children}
      </AuthCard>
    </main>
  );
}
