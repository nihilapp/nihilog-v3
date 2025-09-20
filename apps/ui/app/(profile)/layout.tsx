import { ProfileLayout } from '@/(profile)/_layouts/ProfileLayout';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, }: Props) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
